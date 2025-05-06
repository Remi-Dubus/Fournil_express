"use client";

import { titleFont } from "@/assets/fonts/font";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { browseOrders } from "@/features/bakery/orders/browseOrders.action";
import OrdersList from "@/features/bakery/orders/OrdersList";

import data from "../../../../src/assets/data/order.json";

import type { formatedOrdersType } from "@/types/definitions";

export default function Page() {
	// Find the current bakery
	const { data: session } = useSession();
	const id_bakery = session?.user.id;

	// Browse all orders
	const [allOrders, setAllOrders] = useState<formatedOrdersType[]>([]);

	useEffect(() => {
		if (!id_bakery) return;

		browseOrders(id_bakery)
			.then((response) => {
				if (response) setAllOrders(response);
			})
			.catch(() => {
				toast.error("Impossible de charger vos commandes");
			});
	}, [id_bakery]);

	return (
		<main className="min-h-[85vh] h-full flex flex-col items-center py-4 px-2">
			<h2 className={`text-3xl mb-4 ${titleFont.className} text-dark`}>
				{data.ordersList}
			</h2>
			<OrdersList allOrders={allOrders} setAllOrders={setAllOrders} />
			{allOrders?.length === 0 && <p>{data.noOrder}</p>}
		</main>
	);
}
