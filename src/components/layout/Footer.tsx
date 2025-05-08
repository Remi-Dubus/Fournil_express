import Link from "next/link";

import data from "../../assets/data/layout.json";

export default function Footer() {
	return (
		<footer className="flex flex-col items-center justify-center bg-dark text-light w-full h-16 z-4 static md:h-24 xl:z-0">
			<p className="xl:ml-80 xl:inline-block">&copy; {data.copyrigth}</p>
			<p className="xl:ml-80 xl:inline-block">
				{data.pictureCopyrigth}
				<Link className="text-interest xl:inline-block" href={data.pixabayLink}>
					{data.pixabay}
				</Link>
			</p>
		</footer>
	);
}
