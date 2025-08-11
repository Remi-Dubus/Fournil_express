"use client";

import { titleFont } from "@/assets/fonts/font";

import { toast } from "react-toastify";
import { useState } from "react";

import BakeryList from "../../../../src/features/restaurant/order/BakeryList";

import data from "../../../../src/assets/data/order.json";

import type { productType } from "@/types/definitions";
import ProductsList from "@/features/restaurant/order/ProductsList";
import { browseProducts } from "@/features/bakery/product/browseProducts.action";

export default function Page() {
	// Product of current bakery
	const [allProducts, setAllProducts] = useState<productType[]>([]);

	// Button display products of the current selected bakery
	const handleSelectBakery = async (id: string) => {
		try {
			const response = await browseProducts(id);
			if (response) {
				setAllProducts(response);
			} 
		} catch {
			toast.error("Impossible de charger les produits");
		}
	};

	return (
		<main className="min-h-[85vh] h-fit flex flex-col items-center py-4 px-2 xl:ml-80">
			<h2 className={`text-3xl mb-4 ${titleFont.className} text-dark`}>
				{data.orderTitle}
			</h2>
			<BakeryList handleSelectBakery={handleSelectBakery} />
			<ProductsList allProducts={allProducts} />
		</main>
	);
}
