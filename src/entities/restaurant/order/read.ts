"use server";

import postgres from "postgres";

import type { ordersListType } from "@/types/definitions";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export async function readOrders(id_restaurant: string) {
	const result = await sql<ordersListType[]>`
            SELECT o.id AS booking_id, o.order_number, o.date, o.validate, o.hidden_restaurant, o.hidden_bakery,
            b.label AS restaurant_name, b.email AS restaurant_email, p.label AS product_name,
            p.price, p.id AS product_id, 
            op.quantity
            FROM booking AS o
            JOIN booking_product AS op ON o.id = op.id_booking
            JOIN product AS p ON op.id_product = p.id
            JOIN company AS b ON o.id_bakery = b.id
            WHERE o.id_restaurant = ${id_restaurant} AND o.hidden_restaurant = FALSE
            ORDER BY o.date DESC;
        `;
	return result;
}
