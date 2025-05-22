import { readOrders } from "@/entities/restaurant/order/read";
import formatOrders from "@/lib/utils/formatOrders";

export async function browseOrders(id_restaurant: string) {
	const orders = await readOrders(id_restaurant);
	const formatedOrders = orders && formatOrders(orders);
	return formatedOrders;
}
