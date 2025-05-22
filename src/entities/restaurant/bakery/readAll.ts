"use server";

import postgres from "postgres";

import type { companyType } from "@/types/definitions";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export async function readAllBakery() {
	try {
		const result = await sql<companyType[]>`
				SELECT id, label, email FROM company
				WHERE id_role = 2
				`;
		return {
			result: result,
		};
	} catch {
		return {
			message: "Une erreur est survenue. Veuillez réessayer.",
		};
	}
}
