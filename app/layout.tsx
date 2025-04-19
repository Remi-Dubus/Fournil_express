import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
	title: "Fournil Express",
	description:
		"Site de mise en relation de restaurateur et de boulanger afin de facilité les commandes de pain.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
