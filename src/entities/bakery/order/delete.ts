"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export async function deleteOrder(order: Record<string, string | boolean>) {
	const { id_order, hiddenBakery, hiddenRestaurant } = order;

	try {
		if (hiddenRestaurant === true) {
			await sql`
                DELETE FROM booking_product WHERE id_booking = ${id_order}
            `;
			await sql`
                DELETE FROM booking WHERE id = ${id_order}
            `;
			await sql`
				DELETE FROM product
				WHERE deleted_at IS NOT NULL
				AND id NOT IN (
					SELECT DISTINCT id_product FROM booking_product
				)
			`;
		} else {
			await sql`
                UPDATE booking SET hidden_bakery = ${hiddenBakery} WHERE id = ${id_order}
            `;
		}

		// Clear cache
		revalidatePath("/");

		return {
			success: true,
			message: "La commande a bien été supprimée.",
		};
	} catch {
		return {
			success: false,
			message: "Une erreur est survenue. Veuillez réessayer.",
		};
	}
}
