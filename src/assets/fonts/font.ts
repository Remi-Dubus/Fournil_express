import { Fredoka } from "next/font/google";
import { Cabin } from "next/font/google";
import { Chivo } from "next/font/google";

export const mainTitleFont = Fredoka({
	weight: ["600"],
	subsets: ["latin"],
});

export const titleFont = Cabin({
	weight: ["400", "700"],
	subsets: ["latin"],
});

export const paragraphFont = Chivo({ subsets: ["latin"] });
