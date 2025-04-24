"use client";

import { titleFont } from "@/assets/fonts/font";
import { useState } from "react";

import AddProduct from "@/features/bakery/AddProduct";

import data from "../../../../src/assets/data/bakery/product.json";

export default function Page() {
	// State of modale
	const [addProductModale, setAddProductModale] = useState(false);

	return (
		<main className="min-h-[85vh] h-fit flex flex-col items-center py-4 px-2">
			<h2 className={`text-3xl mb-4 ${titleFont.className} text-dark`}>
				{data.productList}
			</h2>
			<AddProduct
				setOpenModale={setAddProductModale}
				openModale={addProductModale}
			/>
			<button
				type="button"
				className="fixed bg-green-500 bottom-18 py-1 rounded-full px-2 text-dark active:text-light active:bg-green-800 inset z-5 shadow-dark shadow-sm"
				onClick={() => setAddProductModale(true)}
			>
				{data.addProduct}
			</button>
		</main>
	);
}
