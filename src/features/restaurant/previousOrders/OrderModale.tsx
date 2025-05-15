import { titleFont } from "@/assets/fonts/font";

import formatDate from "@/lib/utils/formatDate";

import orderData from "../../../assets/data/order.json";
import productData from "../../../assets/data/product.json";

import type { formatedOrdersType, orderBakeryType } from "@/types/definitions";

export default function OrderModale({
	openModale,
	setOpenModale,
	selectedOrder,
	selectedRestaurant,
}: {
	setOpenModale: (bool: boolean) => void;
	openModale: boolean;
	selectedOrder: orderBakeryType | null;
	selectedRestaurant: string[] | null;
}) {
	// Total price of order
	let totalPriceOfOrder = 0;

	if (selectedOrder) {
		for (const el of selectedOrder.products) {
			if (el.quantity)
				totalPriceOfOrder = totalPriceOfOrder + el?.quantity * el.price;
		}
	}

	return (
		<article
			className={`h-[100vh] inset-0 overflow-hidden top-0 fixed bg-black/30 backdrop-blur-sm flex justify-center items-center z-10 transition-all duration-1000 ${
				openModale
					? "opacity-100 lg:bg-opacity-0 lg:backdrop-blur-0"
					: "opacity-0 pointer-events-none"
			}`}
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
					{orderData.restaurantName}
				</h2>
				<p className="text-dark col-span-2">{selectedRestaurant?.[0]}</p>
				<h2
					className={`${titleFont.className} text-xl text-interest xl:text-2xl`}
				>
					{orderData.emailRestaurant}
				</h2>
				<p className="text-dark col-span-2">{selectedRestaurant?.[1]}</p>
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
					className={`h-8 xl:text-xl ${selectedOrder?.validate === false ? "text-interest" : "text-green-500"}`}
				>
					{selectedOrder?.validate === false
						? orderData.pending
						: orderData.validate}
				</p>
				<button
					type="button"
					className={`h-8 border-2 ${titleFont.className} text-light mb-3 rounded-lg inset shadow-dark shadow-sm xl:text-xl bg-red-700 outline-red-700`}
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
		</article>
	);
}
