import BakeryNavBar from "../../src/components/navigation/BakeryNavBar";

export default function BakerLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<BakeryNavBar />
			<div>{children}</div>
		</>
	);
}
