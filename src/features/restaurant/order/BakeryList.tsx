import { titleFont } from "@/assets/fonts/font";

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { browseBakery } from "./browseBakery.action";

import errorData from "../../../assets/data/error.json";
import data from "../../../assets/data/order.json";

import type { companyType } from "@/types/definitions";

export default function BakeryList({
	handleSelectBakery,
}: { handleSelectBakery: (id: string) => Promise<void> }) {
	// Useform
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Browse all bakery
	const [allBakery, setAllBakery] = useState<companyType[]>([]);

	useEffect(() => {
		async function fetchBakery() {
			try {
				const response = await browseBakery();
				console.log(response);
				if (response.result) {
					setAllBakery(response.result);
				} else {
					toast.error(response?.message);
				}
			} catch (error) {
				toast.error("Impossible de charger les boulangeries.");
			}
		}
		fetchBakery();
	}, []);

	return (
		<article
			id="connect"
			className=" w-full bg-light rounded-lg sm:col-start-2 shadow-dark shadow-sm sm:mb-0 xl:w-1/2"
		>
			<form
				className="p-4 space-y-4 sm:space-y-12 lg:space-y-0 flex flex-col items-center sm:p-8"
				onSubmit={handleSubmit((data) => handleSelectBakery(data.id))}
			>
				<label
					htmlFor="bakery"
					className={`${titleFont.className} text-xl text-center text-interest xl:text-2xl xl:mb-4`}
				>
					{data.chooseBakery}
				</label>
				<select
					id="bakery"
					className="bg-white rounded"
					{...register("id", {
						required: errorData.required,
						validate: (value) => {
							if (value.length < 10) {
								return errorData.required;
							}
						},
					})}
				>
					<option value={0}>{data.selectBakery}</option>
					{allBakery?.map((e) => (
						<option key={e.id} value={e.id}>
							{e.label}
						</option>
					))}
				</select>
				<button
					type="submit"
					className="col-start-2 bg-green-500 mt-2 py-1 rounded-full px-2 text-dark active:text-light active:bg-green-800 inset shadow-dark shadow-sm xl:mt-8"
				>
					{data.confirmButton}
				</button>
			</form>
		</article>
	);
}
