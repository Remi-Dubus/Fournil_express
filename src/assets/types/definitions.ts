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