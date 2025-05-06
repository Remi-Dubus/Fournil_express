"use server";

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export async function validateOrder(
	newState: Record<string, string | boolean>,
) {
	const { id_order, currentState } = newState;

	try {
		const result = await sql`
			UPDATE booking SET validate = ${currentState} WHERE id = ${id_order}
        `;

		return {
			result: result,
		};
	} catch (err) {
		return {
			result: null,
		};
	}
}
