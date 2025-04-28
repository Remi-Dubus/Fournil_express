"use client";

import { titleFont } from "@/assets/fonts/font";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

import { addProduct } from "./addProduct.action";

import data from "../../../assets/data/bakery/product.json";
import errorData from "../../../assets/data/error.json";
import { regex } from "../../../lib/utils/regex";

import type { productType } from "@/types/definitions";

export default function AddProduct({
	openModale,
	setOpenModale,
	allProducts,
	setAllProducts,
}: {
	openModale: boolean;
	setOpenModale: (bool: boolean) => void;
	allProducts: productType[];
	setAllProducts: (product: productType[]) => void;
}) {
	// UseForm
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<productType>();

	// Find the actual bakery
	const { data: session } = useSession();
	const id_bakery = session?.user.id;

	// Button for submit the product form
	const handleAddProduct = async (product: productType) => {
		try {
			let newProduct: productType = product;

			if (id_bakery) {
				newProduct = { ...newProduct, id_bakery: id_bakery };
			} else {
				toast.error("Une erreur est survenue. Veuillez réessayer.");
			}
			setOpenModale(false);
			const response = await addProduct(newProduct);

			if (!response?.success) {
				toast.error(response.message);
			} else {
				toast.success(response.message);
				if (response?.product) {
					newProduct = { ...newProduct, id: response?.product.id };
				}
				// Add to current state
				let newAllProducts = [...allProducts];
				newAllProducts = [...newAllProducts, newProduct];
				setAllProducts(newAllProducts);
				reset();
			}
		} catch (error) {
			toast.error("Une erreur est survenue. Veuillez réessayer.");
		}
	};

	return (
		<section
			className={`h-[100vh] inset-0 overflow-auto top-0 fixed bg-black/30 backdrop-blur-sm flex justify-center items-center z-10 transition-all duration-1000 ${
				openModale
					? "opacity-100 lg:bg-opacity-0 lg:backdrop-blur-0"
					: "opacity-0 pointer-events-none"
			}`}
		>
			<form
				onSubmit={handleSubmit(handleAddProduct)}
				className={`grid grid-cols-3 gap-2 px-2 py-4 bg-light rounded-lg shadow-lg transform duration-1000 ease-in-out ${openModale ? "translate-y-0" : "translate-y-full"}`}
			>
				<h2
					className={`${titleFont.className} text-center my-4 text-3xl col-span-3`}
				>
					{data.addProduct}
				</h2>
				<label htmlFor="label" className="text-dark">
					{data.label}
				</label>
				<input
					{...register("label", {
						required: errorData.required,
						minLength: {
							value: 3,
							message: errorData.minChar,
						},
						maxLength: {
							value: 30,
							message: errorData.maxChar,
						},
						pattern: {
							value: regex.productRegex,
							message: errorData.company,
						},
					})}
					id="label"
					type="text"
					className="bg-yellow-50 col-span-2"
				/>
				<p className="text-red-800 col-span-3">{errors.label?.message}</p>
				<label htmlFor="price" className="text-dark">
					{data.price}
				</label>
				<input
					id="price"
					{...register("price", {
						required: errorData.required,
						pattern: {
							value: regex.priceRegex,
							message: errorData.company,
						},
					})}
					type="text"
					className="bg-yellow-50 col-span-2"
				/>
				<p className="text-red-800 col-span-3">{errors.price?.message}</p>
				<button
					type="submit"
					className="col-start-2 bg-green-500 mt-8 py-1 rounded-full px-2 text-dark active:text-light active:bg-green-800 inset shadow-dark shadow-sm"
				>
					{data.addButton}
				</button>
				<button
					type="button"
					className="bg-red-800 col-start-2 py-1 rounded-full text-light active:bg-orange-300 active:text-dark shadow-dark shadow-sm"
					onClick={() => setOpenModale(false)}
				>
					{data.returnButton}
				</button>
			</form>
		</section>
	);
}
