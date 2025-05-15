"use client";

import { titleFont } from "@/assets/fonts/font";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { browseOrders } from "@/features/restaurant/previousOrders/browseOrders.action";
import OrdersList from "@/features/restaurant/previousOrders/OrderList";

import data from "../../../../src/assets/data/order.json";

import type { formatedOrdersType, ordersListType } from "@/types/definitions";

export default function Page() {
	// Find the current restaurant
	const { data: session } = useSession();
	const id_restaurant = session?.user.id;

	// Browse orders
	const [orders, setOrders] = useState<formatedOrdersType[]>([]);

	useEffect(() => {
		if (!id_restaurant) return;

		browseOrders(id_restaurant)
			.then((response) => {
				if (response) setOrders(response);
			})
			.catch(() => {
				toast.error("Impossible de charger vos commandes");
			});
	}, [id_restaurant]);

	return (
		<main className="min-h-[85vh] h-full flex flex-col items-center py-4 px-2 xl:ml-80">
			<h2
				className={`text-3xl mb-4 ${titleFont.className} text-dark text-center`}
			>
				{data.ordersList}
			</h2>
			<OrdersList orders={orders} />
			{orders?.length === 0 && <p>{data.noOrder}</p>}
		</main>
	);
}
