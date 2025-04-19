import "./globals.css";

import type { Metadata } from "next";
import { Bounce, ToastContainer } from "react-toastify";
import { paragraphFont } from "../src/ui/font";

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

export const metadata: Metadata = {
	title: "Fournil Express",
	description:
		"Site de mise en relation de restaurateur et de boulanger afin de facilité les commandes de pain.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body
				className={`${paragraphFont.className} antialiased bg-[#ffc585] `}
			>
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
			</body>
		</html>
	);
}
