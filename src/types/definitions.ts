export type registerType = {
	id?: number;
	id_role?: number | null;
	company: string;
	email: string;
	phone: string;
	role: "restaurant" | "bakery";
	password: string;
	confirm: string;
};

export type productType = {
	id?: number;
	label: string;
	price: number;
	id_bakery: string;
};
