import { titleFont } from "@/assets/fonts/font";

import { toast } from "react-toastify";
import { useState } from "react";

import formatDate from "@/lib/utils/formatDate";
import orderData from "../../../assets/data/order.json";
import productData from "../../../assets/data/product.json";
import ConfirmDeleteModale from "@/components/ui/ConfirmDeleteModale";
import { switchValidateOrderStatus } from "@/services/order/switchValidateOrderStatus";
import { destroyOrder } from "./destroyOrder.action";

import type { formatedOrdersType, ordersType } from "@/types/definitions";

export default function OrderModale({
	openModale,
	setOpenModale,
	selectedOrder,
	setOrders,
	selectedBakery,
}: {
	setOpenModale: (bool: boolean) => void;
	openModale: boolean;
	selectedOrder: ordersType | null;
	setOrders: React.Dispatch<React.SetStateAction<formatedOrdersType[]>>;
	selectedBakery: string[] | null;
}) {
	// State of modale;
	const [confirmDeleteModale, setConfirmDeleteModale] = useState(false);

	// Total price of order
	let totalPriceOfOrder = 0;

	if (selectedOrder) {
		for (const el of selectedOrder.products) {
			if (el.quantity)
				totalPriceOfOrder = totalPriceOfOrder + el?.quantity * el.price;
		};
	}

	// Button for delete an order
	const handleDeleteOrder = async (id_order: string) => {
		// Create an object with id order and delete status for restaurant and bakery
		const orderToDelete = {
			id_order,
			hiddenRestaurant: true,
			hiddenBakery: !!selectedOrder?.hidden_bakery,
		};

		// Switch pendin to cancel
		let currentState = selectedOrder?.validate;
		
		if(currentState !== 2) {
			currentState = 3;
		};

		const newState = { id_order, currentState };

		try {
			const switchResponse = await switchValidateOrderStatus(newState);
			const deleteResponse = await destroyOrder(orderToDelete);

			if (!switchResponse || !deleteResponse.success) {
				toast.error(deleteResponse.message);
			} else {
				setOrders((prevState) =>
					prevState
						.map((e) => ({
							...e,
							orders: e.orders.filter((o) => o.booking_id !== id_order),
						}))
						.filter((e) => e.orders.length > 0),
				);
				toast.success(deleteResponse.message);
				setOpenModale(false);
				setConfirmDeleteModale(false);
			}
		} catch {
			toast.error("Une erreur est survenue. Veuillez réessayer.");
		}
	};

	return (
		<article
			className={`h-[100vh] inset-0 overflow-hidden top-0 fixed bg-black/30 flex justify-center items-center z-10 transition-all duration-1000 ${
				openModale
					? "opacity-100 lg:bg-opacity-0 lg:backdrop-blur-0"
					: "opacity-0 pointer-events-none"
			} ${confirmDeleteModale ? "backdrop-blur-none" : "backdrop-blur-sm"}`}
		>
			<section
				className={`overflow-y-auto grid grid-cols-3 items-center w-11/12 gap-2 px-1 py-2 bg-light rounded-lg shadow-lg transform duration-1000 ease-in-out sm:w-8/12 sm:px-4 xl:w-1/3 ${openModale ? "translate-y-0" : "translate-y-full"}`}
			>
				<h2 className="text-center font-title text-2xl text-dark break-words col-span-3 xl:text-3xl">
					{orderData.orderNumber}
					{selectedOrder?.order_number}
				</h2>
				<h2
					className={`${titleFont.className} text-xl text-interest xl:text-2xl`}
				>
					{orderData.bakeryName}
				</h2>
				<p className="text-dark col-span-2">{selectedBakery?.[0]}</p>
				<h2
					className={`${titleFont.className} text-xl text-interest xl:text-2xl`}
				>
					{orderData.emailRestaurant}
				</h2>
				<p className="text-dark col-span-2">{selectedBakery?.[1]}</p>
				<h2
					className={`${titleFont.className} text-xl text-interest xl:text-2xl`}
				>
					{orderData.date}
				</h2>
				<p className="text-dark col-span-2">
					{selectedOrder && formatDate(selectedOrder?.date)}
				</p>
				<h2
					className={`${titleFont.className} text-xl text-interest mb-3 xl:text-2xl`}
				>
					{orderData.orderState}
				</h2>
				<p
					className={`h-8 mt-1 mb-3 xl:text-xl ${selectedOrder?.validate === 0 ? "text-dark" : selectedOrder?.validate === 1 ? "text-green-500" : "text-interest"}`}
					
				>
					{selectedOrder?.validate === 0
						? orderData.pending
						: selectedOrder?.validate === 1
							? orderData.validate
							: selectedOrder?.validate === 2
								? orderData.refuse
								: orderData.cancel}
				</p>
				<button
					type="button"
					className={`h-8 border-2 ${titleFont.className} text-light mb-3 rounded-lg inset shadow-dark shadow-sm xl:text-xl bg-red-700 outline-red-700`}
					onClick={() => {
						setConfirmDeleteModale(true);
					}}
				>
					{productData.deleteButton}
				</button>
				<h2
					className={`${titleFont.className} col-span-3 text-xl text-center text-interest xl:text-2xl`}
				>
					{productData.productList}
				</h2>
				<h3
					className={`${titleFont.className} text-center text-interest mt-1 xl:text-xl`}
				>
					{productData.label}
				</h3>
				<h3
					className={`${titleFont.className} text-center text-interest mt-1 xl:text-xl`}
				>
					{productData.price}
				</h3>
				<h3
					className={`${titleFont.className} text-center text-interest mt-1 xl:text-xl`}
				>
					{productData.quantity}
				</h3>
				{selectedOrder?.products.map((p) => (
					<ul key={p.id} className="text-dark col-span-3 grid grid-cols-3">
						<li className="text-center break-words">{p.label}</li>
						<li className="text-center break-words">{p.price.toFixed(2)} €</li>
						<li className="text-center break-words">{p.quantity}</li>
					</ul>
				))}
				<h3
					className={`${titleFont.className} text-xl text-interest xl:text-2xl`}
				>
					{productData.price} total:
				</h3>
				<p className="text-dark text-center">{totalPriceOfOrder.toFixed(2)}€</p>
				<button
					type="button"
					className={`${titleFont} col-start-2 text-light text-lg inset shadow-dark shadow-sm bg-dark w-full px-3 mt-2 h-8 rounded-full active:bg-interest active:text-dark`}
					onClick={() => {
						setOpenModale(false);
					}}
				>
					retour
				</button>
			</section>
			<ConfirmDeleteModale
				openModale={confirmDeleteModale}
				setOpenModale={setConfirmDeleteModale}
				current={selectedOrder?.booking_id}
				handleDelete={handleDeleteOrder}
			/>
		</article>
	);
}
