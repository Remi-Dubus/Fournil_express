import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			label: string;
			email: string;
			id_role: number;
		} & DefaultSession["user"];
	}

	interface User extends DefaultUser {
		id: string;
		label: string;
		email: string;
		id_role: number;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		label: string;
		email: string;
		id_role: number;
	}
}
