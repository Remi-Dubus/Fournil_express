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

export interface SendEmailType {
	to: string;
	subject: string;
	text: string;
	html?: string;
}

export type companyType = {
	id: string;
	label: string;
	email: string;
};

export type productType = {
	id?: string;
	label: string;
	price: number;
	id_bakery: string;
};

export type orderRestaurantType = {
	id?: string;
	label: string;
	price: number;
	quantity?: number;
	id_restaurant?: string;
	id_bakery: string;
};

export type orderProductType = {
	label: string;
	price: number;
	quantity: number;
	id: string;
};

export type ordersType = {
	booking_id: string;
	order_number: number;
	date: string;
	validate: number;
	hidden_bakery?: boolean;
	hidden_restaurant?: boolean;
	products: orderProductType[];
};

export type formatedOrdersType = {
	label: string;
	email: string;
	orders: ordersType[];
};

export type ordersListType = {
	booking_id: string;
	order_number: number;
	restaurant_name: string;
	restaurant_email: string;
	date: string;
	product_name: string;
	price: number;
	quantity: number;
	validate: number;
	hidden_bakery: boolean;
	hidden_restaurant: boolean;
	product_id: string;
};

export type deleteType = {
	id: string;
	id_company?: string;
};

export type modaleDeleteType = {
	openModale: boolean;
	setOpenModale: (bool: boolean) => void;
	current?: string;
	handleDelete: (id: string) => void;
};
