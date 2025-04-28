import { titleFont } from "@/assets/fonts/font";

import data from "../../assets/data/confirmDeleteModale.json";
import type { modaleDeleteType } from "@/types/definitions";

export default function ConfirmDeleteModale({
	openModale,
	setOpenModale,
	current,
	handleDelete,
}: modaleDeleteType) {
	return (
		<article
			className={`h-[100vh] inset-0 overflow-auto top-0 fixed bg-black/30 backdrop-blur-sm flex justify-center items-center z-10 transition-all duration-1000 ${
				openModale
					? "opacity-100 lg:bg-opacity-0 lg:backdrop-blur-0"
					: "opacity-0 pointer-events-none"
			}`}
		>
			<section
				className={`flex flex-col items-center w-9/12 gap-2 px-2 py-4 bg-light rounded-lg shadow-lg transform duration-1000 ease-in-out xl:w-1/4 ${openModale ? "translate-y-0" : "translate-y-full"}`}
			>
				<h2
					className={`${titleFont.className} text-center my-4 text-2xl col-span-3`}
				>
					{data.confimation}
				</h2>
				<button
					type="submit"
					className="bg-green-500 w-1/2 mt-8 py-1 rounded-full px-2 text-dark active:text-light active:bg-green-800 inset shadow-dark shadow-sm"
					onClick={() => {
						if (current) {
							handleDelete(`${current}`);
						}
					}}
				>
					{data.deleteButton}
				</button>
				<button
					type="button"
					className="bg-red-800 py-1 w-1/2 rounded-full text-light active:bg-orange-300 active:text-dark shadow-dark shadow-sm"
					onClick={() => setOpenModale(false)}
				>
					{data.returnButton}
				</button>
			</section>
		</article>
	);
}
