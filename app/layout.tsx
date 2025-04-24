import "./globals.css";
import type { Metadata } from "next";
import { Bounce, ToastContainer } from "react-toastify";

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { paragraphFont } from "../src/assets/fonts/font";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata: Metadata = {
	title: "Fournil Express",
	description:
		"Site de mise en relation entre restaurateurs et boulangers afin de facilité les commandes de pain.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className={`${paragraphFont.className} antialiased bg-[#ffc585]`}>
				<SessionWrapper>
					<Header />
					{children}
					<Footer />
					<ToastContainer
						position="top-right"
						autoClose={2000}
						hideProgressBar={true}
						newestOnTop={false}
						closeOnClick={false}
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="colored"
						transition={Bounce}
					/>
				</SessionWrapper>
			</body>
		</html>
	);
}
