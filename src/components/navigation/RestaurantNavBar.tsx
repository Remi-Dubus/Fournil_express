"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

import { titleFont } from "@/assets/fonts/font";

import { getSession } from "next-auth/react";
import BurgerButton from "./BurgerButton";
import { getRoleSlug, slugify } from "@/lib/utils/slug";

import data from "../../assets/data/navbar/restaurantNavBar.json";

export default function burgerMenuCompany() {
	// State of menu
	const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
	const handleClickMenu = () => setOpenBurgerMenu(!openBurgerMenu);

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

	return (
		<nav className="fixed right-2 -top-2 z-8 xl:relative xl:z-2 xl:w-1/6">
			<BurgerButton
				handleClickMenu={handleClickMenu}
				openMenu={openBurgerMenu}
			/>
			<ul
				className={`absolute right-0 mt-2 flex flex-col text-light font-paragraph transform duration-1000 ease-in-out xl:left-0 xl:w-1/6 xl:flex xl:flex-col xl:bg-light xl:z-0 xl:h-[100vh] xl:gap-8 xl:fixed xl:top-0 ${openBurgerMenu ? "-translate-x-0" : "xl:opacity-100 xl:translate-x-0 translate-x-full opacity-0"}`}
			>
				<h2
					className={`hidden xl:block text-center ${titleFont.className} text-2xl mt-36 text-dark`}
				>
					Menu
				</h2>
				<button
					type="button"
					className="bg-dark py-2 px-6 rounded-lg border-light border-2 active:bg-light active:text-dark active:border-dark xl:hover:text-interest xl:bg-light xl:text-dark xl:active:text-gray-600 xl:border-none xl:mt-14"
					onClick={() => {
						setOpenBurgerMenu(false);
						redirect(`/${role}/${slug}/order`);
					}}
				>
					{data.order}
				</button>
				<button
					type="button"
					className="bg-dark py-2 px-6 rounded-lg border-light border-2 active:bg-light active:text-dark active:border-dark xl:hover:text-interest xl:bg-light xl:text-dark xl:active:text-gray-600 xl:border-none"
					onClick={() => {
						setOpenBurgerMenu(false);
						redirect(`/${role}/${slug}/previous-orders`);
					}}
				>
					{data.previousOrders}
				</button>
				<button
					type="button"
					className="bg-dark py-2 px-3.5 rounded-lg border-light border-2 active:bg-light active:text-dark active:border-dark xl:hover:text-interest xl:bg-light xl:text-dark xl:active:text-gray-600 xl:border-none xl:absolute xl:bottom-18 xl:w-full"
					onClick={() => signOut()}
				>
					{data.disconnect}
				</button>
			</ul>
		</nav>
	);
}
