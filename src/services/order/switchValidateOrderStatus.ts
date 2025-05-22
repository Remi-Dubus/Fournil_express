"use server";

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export async function switchValidateOrderStatus(
	newState: Record<string, string | number>,
) {
	const { id_order, currentState } = newState;

	try {
		const result = await sql`
            UPDATE booking SET validate = ${currentState} WHERE id = ${id_order}
        `;

		return {
			result: result,
		};
	} catch {
		return {
			result: null,
		};
	}
}
