import { validateOrder } from "@/entities/bakery/order/validateOrder";
import formatOrders from "@/lib/utils/formatOrders";

export async function switchValidateOrder(
	newState: Record<string, string | boolean>,
) {
	const orders = await validateOrder(newState);
	return orders;
}
