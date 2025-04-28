"use client";

import data from "../../../assets/data/bakery/product.json";

import type { productType } from "@/types/definitions";

export default function ProductsList({
	allProducts,
	setCurrentProduct,
	setConfirmDeleteModale,
}: {
	allProducts: productType[];
	setCurrentProduct: (n: number) => void;
	setConfirmDeleteModale: (bool: boolean) => void;
}) {
	return (
		<ul className="w-11/12 xl:flex xl:flex-col xl:items-center">
			{allProducts?.map((e) => (
				<li
					key={e.id}
					className="mb-1 bg-light py-4 px-2 rounded-lg w-full grid grid-cols-7 shadow-dark shadow-sm items-center xl:w-1/2"
				>
					<p className="col-span-3">{e.label}</p>
					<p className="w-96 col-span-2">{e.price} €</p>
					<button
						type="button"
						className="bg-red-800 py-1 col-span-2 rounded-full text-sm text-light active:bg-orange-300 active:text-dark shadow-dark shadow-sm"
						onClick={() => {
							e.id && setCurrentProduct(e.id);
							setConfirmDeleteModale(true);
						}}
					>
						{data.deleteButton}
					</button>
				</li>
			))}
		</ul>
	);
}
