import { convertFromCents } from "./convertPrice";

import type { ordersListType, formatedOrdersType } from "@/types/definitions";

export default function formatOrders(
	orders: ordersListType[],
): formatedOrdersType[] {
	const groupedByRestaurant: Record<string, formatedOrdersType> = {};

	for (const order of orders) {
		const {
			booking_id,
			order_number,
			restaurant_name,
			date,
			restaurant_email,
			product_name,
			price,
			quantity,
			validate,
			hidden_bakery,
			hidden_restaurant,
			product_id,
		} = order;

		// create new restaurant if not exist
		if (!groupedByRestaurant[restaurant_name]) {
			groupedByRestaurant[restaurant_name] = {
				label: restaurant_name,
				email: restaurant_email,
				orders: [],
			};
		}

		// find order
		let existingOrder = groupedByRestaurant[restaurant_name].orders.find(
			(o) => o.order_number === order_number,
		);

		// if order not exit, create new order
		if (!existingOrder) {
			existingOrder = {
				booking_id,
				order_number,
				date: new Date(date).toISOString(),
				validate,
				hidden_bakery,
				hidden_restaurant,
				products: [],
			};
			groupedByRestaurant[restaurant_name].orders.push(existingOrder);
		}

		// add product to new order
		existingOrder?.products.push({
			id: product_id,
			label: product_name,
			price: Number.parseFloat(convertFromCents(price)),
			quantity,
		});
	}

	return Object.values(groupedByRestaurant);
}
