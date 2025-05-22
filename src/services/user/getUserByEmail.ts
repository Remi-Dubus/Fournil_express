"use server";

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export const getUserByEmail = async (email: string) => {
	try {
		const result = await sql`
		SELECT * FROM company
		WHERE email = ${email}
		`;

		if (result[0].length <= 0) {
			return null;
		}
		return result[0];
	} catch {
		return {
			message: "Email ou mot de passe invalide.",
		};
	}
};
