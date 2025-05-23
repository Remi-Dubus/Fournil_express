"use server";

import postgres from "postgres";

import type { productType } from "@/types/definitions";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export async function readAllProducts(id_bakery: string) {
	const result = await sql<productType[]>`
		SELECT * FROM product
		WHERE id_bakery = ${id_bakery} AND deleted_at IS NULL
		`;
	return result;
}
