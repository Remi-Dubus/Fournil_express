"use server";

import postgres from "postgres";

import type { ordersListType } from "@/types/definitions";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export async function readAllOrders(id_bakery: string) {
	const result = await sql<ordersListType[]>`
            SELECT b.id AS booking_id, b.order_number, b.date, b.validate, b.hidden_bakery, b.hidden_restaurant,
            r.label AS restaurant_name, r.email AS restaurant_email, p.label AS product_name,
            p.price, p.id AS product_id, 
            bp.quantity
            FROM booking AS b
            JOIN booking_product AS bp ON b.id = bp.id_booking
            JOIN product AS p ON bp.id_product = p.id
            JOIN company AS r ON b.id_restaurant = r.id
            WHERE b.id_bakery = ${id_bakery}
            ORDER BY b.date DESC;
        `;
	return result;
}
