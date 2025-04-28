"use server";

import postgres from "postgres";

import type { deleteType } from "@/types/definitions";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export async function deleteProduct(ids: deleteType) {
	try {
		const { id, id_company } = ids;
		if (id && id_company) {
			const result = await sql`
		    	DELETE FROM product WHERE id = ${id} AND id_company = ${id_company}
		    	`;

			return {
				success: true,
				result: result,
				message: "Le produit a bien été supprimé.",
			};
		}
	} catch (err) {
		return {
			success: false,
			message: "Une erreur est survenue. Veuillez réessayer.",
		};
	}
}
