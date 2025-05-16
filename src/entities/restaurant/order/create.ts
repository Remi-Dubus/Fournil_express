"use server";

import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { CreateOrderValidation } from "@/lib/utils/validation";

import type { orderRestaurantType } from "@/types/definitions";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export async function createOrder(order: orderRestaurantType[]) {
	// Validate field with zod
	let validateField = null;
	for (const el of order) {
		validateField = CreateOrderValidation.safeParse({
			label: el.label,
			price: el.price,
			quantity: el.quantity,
			id_restaurant: el.id_restaurant,
			id_bakery: el.id_bakery,
		});

		if (!validateField.success) {
			console.error(validateField);
			return {
				success: false,
				errors: validateField.error.flatten().fieldErrors,
				message: "Champ manquant.",
			};
		}
	}

	try {
		if (order[0].id_restaurant) {
			const resultOrder = await sql`
            INSERT INTO booking (id_bakery, id_restaurant)
            VALUES(${order[0].id_bakery}, ${order[0].id_restaurant})
            RETURNING id;
            `;

			for (const product of order) {
				const id = product.id;
				const quantity = Number(product.quantity);
				const reservationId = resultOrder[0]?.id;

				if (!id || !quantity || !reservationId) {
					console.warn("Champs manquants ou invalides pour l'insertion : ", {
						id,
						quantity,
						reservationId,
					});
					continue;
				}

				await sql`
                    INSERT INTO booking_product (id_product, id_booking, quantity)
                    VALUES(${id}, ${reservationId}, ${quantity});
                `;
			}

			// Clear cache
			revalidatePath("/");
			return {
				success: true,
				message: "La commande est passée.",
			};
		}
	} catch (error) {
		return {
			success: false,
			message: "Une erreur est survenue. Veuillez réessayer.",
		};
	}
}
