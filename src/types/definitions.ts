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

export type deleteType = {
	id: string;
	id_company?: string;
};

export type modaleDeleteType = {
	openModale: boolean;
	setOpenModale: (bool: boolean) => void;
	current?: number;
	handleDelete: (id: string) => void;
};
