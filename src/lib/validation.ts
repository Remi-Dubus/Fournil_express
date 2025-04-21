import { z } from "zod";

import errorData from "../assets/data/error.json";

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
