import { readAllOrders } from "@/entities/bakery/order/readAll";
import formatOrders from "@/lib/utils/formatOrders";

export async function browseOrders(id_bakery: string) {
	const orders = await readAllOrders(id_bakery);
	const formatedOrders = orders && formatOrders(orders);
	return formatedOrders;
}
