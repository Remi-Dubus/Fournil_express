"use server";

import postgres from "postgres";

import type { registerType } from "@/types/definitions";
import { CreateAccountValidation } from "@/lib/validation";
import { hashPassword } from "../../lib/hashPassword";
import { companyRole } from "./user.logic";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export async function createAccount(registerForm: registerType) {
	// Validate field with zod
	const validationResult = CreateAccountValidation.safeParse({
		company: registerForm.company,
		phone: registerForm.phone,
		email: registerForm.email,
		role: registerForm.role,
		password: registerForm.password,
	});

	if (!validationResult.success) {
		return {
			success: false,
			errors: validationResult.error.flatten().fieldErrors,
			message: "Champ manquant. Échec de l'inscription.",
		};
	}

	const { company, phone, email, role, password } = validationResult.data;

	// Find the type of company
	const id_role = companyRole(role);

	if (!id_role) {
		return {
			success: false,
			message: "L'activité de l'entreprise ne correspond à aucune activité.",
		};
	}

	try {
		// Hash the password
		const hashedPassword = await hashPassword(password);

		// Add to database
		await sql`
			INSERT INTO company (label, tel, email, id_role, password)
			VALUES (${company}, ${phone}, ${email}, ${id_role}, ${hashedPassword})
		`;

		revalidatePath("/");

		return {
			success: true,
			message: "Votre compte a bien été créé.",
		};
	} catch (err) {
		return {
			success: false,
			message:
				"Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
		};
	}
}
