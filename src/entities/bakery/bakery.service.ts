"use server";

import postgres from "postgres";

import type { productType } from "@/types/definitions";
import { CreateProductValidation } from "@/lib/utils/validation";
import { revalidatePath } from "next/cache";
import { convertToCent } from "@/lib/utils/convertPrice";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export async function createProduct(productForm: productType) {
	// Convert price on cent
	productForm.price = convertToCent(productForm.price);

	// Validate field with zod
	const validationResult = CreateProductValidation.safeParse({
		label: productForm.label,
		price: productForm.price,
		id_bakery: productForm.id_bakery,
	});

	if (!validationResult.success) {
		return {
			success: false,
			errors: validationResult.error.flatten().fieldErrors,
			message: "Champ manquant.",
		};
	}

	// Add to database
	const { label, price, id_bakery } = productForm;

	try {
		const result = await sql`
            INSERT INTO product (label, price, id_company)
            VALUES(${label}, ${price}, ${id_bakery})
            RETURNING id;
            `;

		// Clear cache
		revalidatePath("/");
		return {
			success: true,
			message: "Le produit a bien été créé.",
			product: result[0],
		};
	} catch (err) {
		return {
			message: "Une erreur est survenue. Veuillez réessayer.",
		};
	}
}
