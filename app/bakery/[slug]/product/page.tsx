"use client";

import { titleFont } from "@/assets/fonts/font";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import AddProduct from "@/features/bakery/product/AddProduct";

import data from "../../../../src/assets/data/bakery/product.json";
import ProductsList from "@/features/bakery/product/ProductsList";

import type { productType } from "@/types/definitions";
import { browseProducts } from "@/features/bakery/product/browseProducts.action";

export default function Page() {
	// State of modale
	const [addProductModale, setAddProductModale] = useState(false);

	// Find the actual bakery
	const { data: session } = useSession();
	const id_bakery = session?.user.id;

	// Browse all products
	const [allProducts, setAllProducts] = useState<productType[]>([]);

	useEffect(() => {
		if (!id_bakery) return;

		browseProducts(id_bakery)
			.then((response) => {
				if (response) setAllProducts(response);
			})
			.catch(() => {
				toast.error("Impossible de charger vos produits");
			});
	}, [id_bakery]);

	return (
		<main className="min-h-[85vh] h-fit flex flex-col items-center py-4 px-2">
			<h2 className={`text-3xl mb-4 ${titleFont.className} text-dark`}>
				{data.productList}
			</h2>
			<ProductsList allProducts={allProducts} />
			<AddProduct
				setOpenModale={setAddProductModale}
				openModale={addProductModale}
			/>
			{allProducts?.length === 0 && <p>{data.noProduct}</p>}
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
