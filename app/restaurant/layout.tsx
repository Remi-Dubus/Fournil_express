import RestaurantNavBar from "../../src/components/navigation/RestaurantNavBar";

export default function RestaurantLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<RestaurantNavBar />
			<div>{children}</div>
		</>
	);
}
