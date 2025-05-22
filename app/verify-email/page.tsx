"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { titleFont } from "@/assets/fonts/font";

export default function merifyEmail() {
	const params = useSearchParams();
	const status = params.get("status");

	let message =
		"Email vérifié avec succès! Vous pouvez dès à présent vous connecter.";

	if (status === "expired") {
		message = "Ce lien est expiré.";
	}

	if (status === "missing") {
		message = "Lien invalide.";
	}

	return (
		<main
			className={` mb-4 min-h-[82vh] h-full flex flex-col justify-center items-center py-4 px-2 ${titleFont.className} text-dark sm:text-2xl`}
		>
			<article className="text-center bg-light p-6 rounded-lg shadow-dark shadow-sm">
				<p>{message}</p>
				<p className="mt-2">
					Retour à
					<Link href="/" className="ml-1.5 text-interest active:text-gray-600">
						l&apos;accueil
					</Link>
					.
				</p>
			</article>
		</main>
	);
}
