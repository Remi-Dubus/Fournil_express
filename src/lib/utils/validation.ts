import { z } from "zod";

import errorData from "../../assets/data/error.json";

// User Schema
const LoginFormSchema = z.object({
	id: z.string().uuid(),
	company: z
		.string()
		.min(4, { message: errorData.minChar })
		.max(150, { message: errorData.maxChar }),
	email: z
		.string()
		.min(10, { message: errorData.minChar })
		.max(150, { message: errorData.maxChar }),
	phone: z
		.string()
		.min(10, { message: errorData.minChar })
		.max(20, { message: errorData.maxChar }),
	role: z.enum(["restaurant", "bakery"], {
		invalid_type_error: errorData.typeOfCompany,
	}),
	password: z
		.string()
		.min(10, { message: errorData.minChar })
		.max(150, { message: errorData.maxChar }),
});

export const CreateAccountValidation = LoginFormSchema.omit({ id: true });

export const ReadAccountValidation = LoginFormSchema.pick({
	email: true,
	password: true,
});

// Product Schema
const ProductFormSchema = z.object({
	id: z.string().uuid(),
	label: z
		.string()
		.min(3, { message: errorData.minChar })
		.max(30, { message: errorData.maxChar }),
	price: z.number(),
	id_bakery: z.string().uuid(),
});

export const CreateProductValidation = ProductFormSchema.omit({
	id: true,
});
