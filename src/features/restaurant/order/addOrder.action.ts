import { createOrder } from "@/entities/restaurant/order/create";

import type { orderRestaurantType } from "@/types/definitions";

export async function addOrder(order: orderRestaurantType[]) {
	return await createOrder(order);
}
