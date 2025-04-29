import { createOrder } from "@/entities/restaurant/order/create";

import type { orderType } from "@/types/definitions";

export async function addOrder(order: orderType[]) {
	return await createOrder(order);
}
