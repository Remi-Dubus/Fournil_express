import { titleFont } from "@/assets/fonts/font";

import { useState } from "react";
import formatDate from "@/lib/utils/formatDate";
import OrderModale from "./OrderModale";

import data from "../../../assets/data/order.json";

import type { formatedOrdersType, orderBakeryType } from "@/types/definitions";

export default function OrdersList({
	allOrders,
	setAllOrders,
}: {
	allOrders: formatedOrdersType[];
	setAllOrders: React.Dispatch<React.SetStateAction<formatedOrdersType[]>>;
}) {
	// State of modale
	const [openSelectedOrderModale, setOpenSelectedOrderModale] = useState(false);

	// Selected order
	const [selectedOrder, setSelectedOrder] = useState<orderBakeryType | null>(
		null,
	);
	const [selectedRestaurant, setSelectedRestaurant] = useState<string[] | null>(
		null,
	);

	return (
		<article className="w-full overflow-auto md:grid md:grid-cols-2 md:gap-1 xl:w-2/3 xl:mx-auto">
			{allOrders?.map((e) => (
				<section
					className="rounded-lg h-fit grid grid-cols-3 items-center bg-light p-2 m-1 inset shadow-dark shadow-sm"
					key={e.label}
				>
					<h2
						className={`${titleFont.className} text-xl text-interest mt-3 xl:text-2xl`}
					>
						{data.restaurantName}
					</h2>
					<p className="text-dark mt-3 col-span-2">{e.label}</p>
					<h2
						className={`${titleFont.className} text-xl text-interest mb-3 xl:text-2xl`}
					>
						{data.emailRestaurant}
					</h2>
					<p className="text-dark mb-3 col-span-2">{e.email}</p>

					{e.orders?.map((o) => (
						<button
							key={o.booking_id}
							type="button"
							onClick={() => {
								setSelectedOrder(o);
								setSelectedRestaurant([e.label, e.email]);
								setOpenSelectedOrderModale(true);
							}}
							className="col-span-3 grid grid-cols-3 items-center gap-1 px-2 rounded-lg mb-1 p-2 text-dark active:bg-interest"
						>
							<p className="bg-white h-full text-start text-sm  px-2 rounded-lg">
								{data.orderNumber}
								{o.order_number}
							</p>
							<p className="bg-white h-full text-sm px-2 rounded-lg">
								{formatDate(o.date)}
							</p>
							<p
								className={`bg-white h-full text-sm pt-2 px-2 rounded-lg ${o.validate === false ? "text-interest" : "text-green-500"}`}
							>
								{o?.validate === false ? data.pending : data.validate}
							</p>
						</button>
					))}
				</section>
			))}
			<OrderModale
				openModale={openSelectedOrderModale}
				setOpenModale={setOpenSelectedOrderModale}
				selectedOrder={selectedOrder}
				setSelectedOrder={setSelectedOrder}
				setAllOrders={setAllOrders}
				selectedRestaurant={selectedRestaurant}
			/>
		</article>
	);
}
