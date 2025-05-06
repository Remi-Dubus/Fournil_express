import { mainTitleFont } from "@/assets/fonts/font";

import Image from "next/image";

import data from "../../assets/data/layout.json";

export default function Header() {
	return (
		<header
			className="flex h-16 bg-cover bg-center bg-no-repeat sticky w-full top-0 z-4 md:h-24"
			style={{ backgroundImage: "url(/banner.jpg)" }}
		>
			<Image
				src="/logo.png"
				width={80}
				height={70}
				alt={data.logoAlt}
				className="my-2 ml-0.5 w-auto h-auto"
			/>
			<h1
				className={`${mainTitleFont.className} absolute left-12 top-4 text-3xl md:top-7 md:left-20 md:text-4xl text-light drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}
			>
				{data.title}
			</h1>
		</header>
	);
}
