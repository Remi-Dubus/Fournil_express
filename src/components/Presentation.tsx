import Link from "next/link";
import Image from "next/image";

import { titleFont } from "../assets/fonts/font";
import data from "../assets/data/presentation.json";

export default function Presentation() {
	return (
		<article className="mt-13 mb-60 w-full bg-light rounded-lg flex flex-col items-center justify-center p-4 py-8 gap-4 shadow-dark shadow-sm sm:col-start-1 sm:justify-start sm:my-0 lg:px-8 lg:pb-12 lg:row-span-2 xl:w-9/12 xl:ml-auto xl:mb-16">
			<h2
				className={`${titleFont.className} text-2xl text-center text-interest lg:text-4xl lg:mb-16`}
			>
				{data.welcome}
			</h2>
			<p className="text-dark text-center lg:text-lg">{data.firstParagraph}</p>
			<Image
				src="/pain-au-chocolat.png"
				width={80}
				height={70}
				alt={data.painAuChocolatAlt}
				className="hidden my-2 ml-0.5 w-auto h-auto md:block"
			/>
			<p className="text-dark text-center lg:text-lg">{data.secondParagraph}</p>
			<Image
				src="/croissant.png"
				width={80}
				height={70}
				alt={data.croissantAlt}
				className="hidden my-2 ml-0.5 w-auto h-auto md:block"
			/>
			<p className="text-dark text-center lg:text-lg">{data.thirdParagraph}</p>
			<Image
				src="/pain.png"
				width={80}
				height={70}
				alt={data.painAlt}
				className="hidden my-2 ml-0.5 w-auto h-auto md:block lg:mb-16"
			/>
			<Link
				href="#connect"
				className="flex flex-col items-center justify-center w-48 h-12 shadow-dark shadow-sm text-light bg-dark hover:bg-primary-700 focus:ring-4 rounded-lg px-5 py-1 text-center hover:scale-105 active:text-dark active:bg-interest sm:hidden"
			>
				<p>{data.login}</p>
			</Link>
		</article>
	);
}
