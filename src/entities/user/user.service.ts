"use server";

import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { addHours } from "date-fns";
import { sendEmail } from "@/lib/utils/sendEmail";

import type { registerType } from "@/types/definitions";
import { CreateAccountValidation } from "@/lib/utils/validation";
import { hashPassword } from "../../lib/utils/hashPassword";
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

		// Create token and expiration date
		const emailVerificationToken = uuidv4();
		const emailVerificationExpires = addHours(new Date(), 4);

		// Add to database
		await sql`INSERT INTO company (label, tel, email, id_role, password, email_verification_token, email_verification_expires)
			VALUES (${company}, ${phone}, ${email}, ${id_role}, ${hashedPassword}, ${emailVerificationToken}, ${emailVerificationExpires})
		`;

		// Send verification email
		const verificationLink = `https://fournil-express.vercel.app/api/verify-email?token=${emailVerificationToken}`;
		await sendEmail({
			to: email,
			subject: "Confirmez votre adresse email",
			text: `Merci de confirmer votre adresse email en cliquant sur ce lien : ${verificationLink}. Ceci est un message automatique merci de ne pas y repondre.`,
		});

		revalidatePath("/");

		return {
			success: true,
			message:
				"Votre compte a bien été créé. Veuillez consulter votre adresse email afin de valider votre compte.",
		};
	} catch {
		return {
			success: false,
			message:
				"Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
		};
	}
}
