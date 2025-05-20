import { deleteOrder } from "@/entities/bakery/order/delete";

export async function destroyOrder(order: Record<string, string | boolean>) {
	return await deleteOrder(order);
}
