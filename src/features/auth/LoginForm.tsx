"use client";

import { titleFont } from "@/assets/fonts/font";

import Link from "next/link";

import data from "../../assets/data/login.json";

import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getRoleSlug, slugify } from "@/lib/utils/slug";

export default function LoginForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	// Login button
	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (res?.ok) {
			const session = await getSession();
			const role = session && getRoleSlug(session?.user.id_role);
			const slug = session && slugify(session?.user.label);

			if (role === "bakery") {
				router.push(`/${role}/${slug}/orders`);
			} else if (role === "restaurant") {
				router.push(`/${role}/${slug}/previous-orders`);
			} else {
				router.push("/");
			}
		} else {
			setError("Email ou mot de passe invalide.");
		}

		setLoading(false);
	};

	return (
		<article
			id="connect"
			className="mb-96 w-full bg-light rounded-lg sm:col-start-2 shadow-dark shadow-sm sm:mb-0 xl:mt-10 xl:w-10/12"
		>
			<section className="p-4 space-y-4 sm:space-y-12 lg:space-y-0 sm:p-8">
				<h2
					className={`${titleFont.className} text-2xl text-center text-interest lg:text-3xl`}
				>
					{data.titleConnection}
				</h2>
				<form
					className="space-y-4 flex flex-col items-center md:space-y-6 "
					onSubmit={handleLogin}
				>
					<fieldset className="w-full">
						<label htmlFor="email" className="block mb-2 text-dark">
							{data.email}
						</label>
						<input
							name="email"
							type="email"
							id="email"
							className="bg-white inset-shadow-dark text-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
							placeholder="name@company.com"
						/>
						{error && <p className="text-red-800">{error}</p>}
					</fieldset>
					<fieldset className="w-full">
						<label
							htmlFor="password"
							className="block mb-2 text-dark dark:text-white"
						>
							{data.password}
						</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="••••••••••••••••"
							className="bg-white text-dark inset-shadow-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
						/>
						{error && <p className="text-red-800">{error}</p>}
					</fieldset>
					<button
						type="submit"
						className="w-48 h-12 shadow-dark shadow-sm text-light bg-dark hover:bg-primary-700 focus:ring-4 rounded-lg px-5 py-1 text-center hover:scale-105 active:text-dark active:bg-interest"
						disabled={loading}
					>
						{loading ? "Connexion..." : data.titleConnection}
					</button>
				</form>
				<p className="text-center h-16 py-4 sm:hidden">
					{data.notRegister}
					<Link
						href="#register"
						className="text-interest active:text-orange-200 "
					>
						{data.createAccount}
					</Link>
				</p>
			</section>
		</article>
	);
}
