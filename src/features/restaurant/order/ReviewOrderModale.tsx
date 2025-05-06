import { titleFont } from "@/assets/fonts/font";

import data from "../../../assets/data/product.json";

import type { orderRestaurantType } from "@/types/definitions";

export default function ReviewOrderModale({
	openModale,
	setOpenModale,
	reviewOrder,
}: {
	setOpenModale: (bool: boolean) => void;
	openModale: boolean;
	reviewOrder: orderRestaurantType[] | null;
}) {
	// Total price of order
	let totalPriceOfOrder = 0;

	if (reviewOrder) {
		for (const el of reviewOrder) {
			if (el.quantity)
				totalPriceOfOrder = totalPriceOfOrder + el?.quantity * el.price;
		}
	}

	return (
		<article
			className={`h-[100vh] inset-0 overflow-auto top-0 fixed bg-black/30 backdrop-blur-sm flex justify-center items-center z-10 transition-all duration-1000 ${
				openModale
					? "opacity-100 lg:bg-opacity-0 lg:backdrop-blur-0"
					: "opacity-0 pointer-events-none"
			}`}
		>
			<ul
				className={`flex flex-col items-center w-11/12 gap-2 px-1 py-4 bg-light rounded-lg shadow-lg transform duration-1000 ease-in-out xl:w-1/4 ${openModale ? "translate-y-0" : "translate-y-full"}`}
			>
				<h2
					className={`${titleFont.className} text-xl mb-4 text-center text-interest xl:text-2xl xl:mb-4`}
				>
					{data.OrderProduct}
				</h2>
				<ul>
					{reviewOrder?.map((e, i) => (
						<li key={e.id} className="grid grid-cols-4">
							<p className="col-span-3">
								{e.quantity} {e.label} à {Number(e.price).toFixed(2)} €
							</p>
							<p className="col-start-4 text-end">
								<strong>Total:</strong>{" "}
								{(e.quantity && e.quantity * e.price)?.toFixed(2)} €
							</p>
						</li>
					))}
					<p className="w-full text-end mt-8">
						<strong>Total:</strong> {totalPriceOfOrder.toFixed(2)} €
					</p>
				</ul>
				<button
					type="submit"
					className="bg-green-500 w-1/2 mt-8 py-1 rounded-full px-2 text-dark active:text-light active:bg-green-800 inset shadow-dark shadow-sm"
				>
					{data.orderButton}
				</button>
				<button
					type="button"
					className="bg-red-800 py-1 w-1/2 rounded-full text-light active:bg-orange-300 active:text-dark shadow-dark shadow-sm"
					onClick={() => setOpenModale(false)}
				>
					{data.returnButton}
				</button>
			</ul>
		</article>
	);
}
