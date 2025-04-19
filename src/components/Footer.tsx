import Link from "next/link";

import data from "../assets/data/layout.json";

export default function Footer() {
	return (
		<footer className="flex flex-col items-center justify-center bg-dark text-light w-full h-16 z-4 relative md:h-24">
			<p>&copy; {data.copyrigth}</p>
			<p>
				{data.pictureCopyrigth}{" "}
				<Link className="text-interest" href={data.pixabayLink}>
					{data.pixabay}
				</Link>
			</p>
		</footer>
	);
}
