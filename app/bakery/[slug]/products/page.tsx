"use client";

import { titleFont } from "@/assets/fonts/font";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import AddProduct from "@/features/bakery/product/AddProduct";
import { browseProducts } from "@/features/bakery/product/browseProducts.action";
import ConfirmDeleteModale from "@/components/ui/ConfirmDeleteModale";
import { destroyProduct } from "@/features/bakery/product/deleteProduct.action";
import ProductsList from "@/features/bakery/product/ProductsList";

import data from "../../../../src/assets/data/product.json";

import type { productType } from "@/types/definitions";

export default function Page() {
	// State of modale
	const [addProductModale, setAddProductModale] = useState(false);
	const [confirmDeleteModale, setConfirmDeleteModale] = useState(false);

	// Find the current bakery
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

	// Delete a product
	const [currentProduct, setCurrentProduct] = useState<string>();

	const handleDeleteProduct = async (id: string) => {
		try {
			const ids = { id, id_company: id_bakery };

			const response = await destroyProduct(ids);

			if (response?.success) {
				toast.success(response.message);
				setAllProducts((prevState) =>
					prevState.filter((e) => `${e.id}` !== id),
				);
				setConfirmDeleteModale(false);
			} else {
				toast.error(response?.message);
			}
		} catch {
			toast.error("Une erreur est survenue. Veuillez réessayer.");
		}
	};

	return (
		<main className="min-h-[85vh] h-fit flex flex-col items-center py-4 px-2 xl:ml-80">
			<h2 className={`text-3xl mb-4 ${titleFont.className} text-dark`}>
				{data.productList}
			</h2>
			<ProductsList
				allProducts={allProducts}
				setCurrentProduct={setCurrentProduct}
				setConfirmDeleteModale={setConfirmDeleteModale}
			/>
			<AddProduct
				openModale={addProductModale}
				setOpenModale={setAddProductModale}
				allProducts={allProducts}
				setAllProducts={setAllProducts}
			/>
			{allProducts?.length === 0 && <p>{data.noProduct}</p>}
			<ConfirmDeleteModale
				openModale={confirmDeleteModale}
				setOpenModale={setConfirmDeleteModale}
				current={currentProduct}
				handleDelete={handleDeleteProduct}
			/>
			<button
				type="button"
				className="bg-green-500 py-1 rounded-full px-2 text-dark active:text-light active:bg-green-800 inset shadow-dark shadow-sm mt-8"
				onClick={() => setAddProductModale(true)}
			>
				{data.addProduct}
			</button>
		</main>
	);
}
