import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { regex } from "../../../lib/utils/regex";
import { addOrder } from "./addOrder.action";
import { getRoleSlug, slugify } from "@/lib/utils/slug";

import ReviewOrderModale from "./ReviewOrderModale";

import data from "../../../assets/data/product.json";
import errorData from "../../../assets/data/error.json";

import type { orderRestaurantType, productType } from "@/types/definitions";

export default function ListOfProduct({
	allProducts,
}: {
	allProducts: productType[];
}) {
	const { data: session } = useSession();

	// State of modale
	const [reviewOrderModale, setReviewOrderModale] = useState(false);

	// Usefrom
	const { register, handleSubmit, reset } = useForm();

	// Review the order
	const [reviewOrder, setReviewOrder] = useState<orderRestaurantType[] | null>(
		null,
	);

	const handleReviewOrder = (array: Record<string, { quantity: number }[]>) => {
		// Flat the array
		const quantities = array.products.map((e) => e.quantity);

		// Update list
		const updatedList = allProducts.map((p, i) => {
			return {
				...p,
				quantity: Number(quantities[i]),
				id_restaurant: session?.user.id,
			};
		});
		setReviewOrder(updatedList);
		setReviewOrderModale(true);
	};

	// Set slugs
	const [role, setRole] = useState<string | null>(null);
	const [slug, setSlug] = useState<string | null>(null);

	useEffect(() => {
		async function fetchSession() {
			const session = await getSession();
			if (session) {
				setRole(getRoleSlug(session.user.id_role));
				setSlug(slugify(session.user.label));
			}
		}
		fetchSession();
	}, []);

	// Confirm the order
	const router = useRouter();

	const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (reviewOrder) {
				const response = await addOrder(reviewOrder);
				if (!response?.success) {
					toast.error(response?.message);
				} else {
					toast.success(response.message);
				}
				setReviewOrderModale(false);
				reset();
				router.push(`/${role}/${slug}/previous-orders`);
			}
		} catch {
			toast.error("Une erreur est survenue. Veuillez réessayer.");
		}
	};

	return (
		<form className="w-full" onSubmit={(e) => handleSubmitOrder(e)}>
			<ul className="w-full flex flex-col items-center">
				{allProducts.length === 0 ? (
					<li className="mt-8 bg-light py-4 px-2 rounded-lg w-full text-center shadow-dark shadow-sm items-center xl:w-1/2">
						{data.noProduct}
					</li>
				) : (
					<li className="mt-8 mb-4 bg-light py-4 px-2 rounded-lg w-full text-interest text-xl grid grid-cols-7 shadow-dark shadow-sm items-center xl:w-1/2">
						<p className="col-span-3">{data.label}</p>
						<p className="col-span-2 text-center">{data.price}</p>
						<p className="col-span-2 text-end">{data.quantity}</p>
					</li>
				)}
				{allProducts?.map((e, i) => (
					<li
						key={e.id}
						className="mb-1 bg-light py-4 px-2 rounded-lg w-full grid grid-cols-7 shadow-dark shadow-sm items-center xl:w-1/2"
					>
						<label htmlFor="quantity" className="col-span-3">
							{e.label}
						</label>
						<p className="text-center col-span-2">
							{Number(e.price).toFixed(2)} €
						</p>
						<input
							type="number"
							className="bg-white text-dark text-right h-fit col-start-7 rounded"
							{...register(`products[${i}].quantity`, {
								required: errorData.required,
								min: {
									value: 0,
									message: errorData.minQuantity,
								},
								max: {
									value: 500,
									message: errorData.maxQuantity,
								},
								pattern: {
									value: regex.quantityRegex,
									message: errorData.company,
								},
							})}
						/>
					</li>
				))}
				<ReviewOrderModale
					openModale={reviewOrderModale}
					setOpenModale={setReviewOrderModale}
					reviewOrder={reviewOrder}
				/>
				<button
					type="button"
					className="col-start-2 bg-green-500 mt-8 py-1 rounded-full px-2 text-dark active:text-light active:bg-green-800 inset shadow-dark shadow-sm"
					onClick={handleSubmit(handleReviewOrder)}
				>
					{data.orderButton}
				</button>
			</ul>
		</form>
	);
}
