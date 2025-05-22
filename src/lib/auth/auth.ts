import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { ReadAccountValidation } from "../utils/validation";
import { getUserByEmail } from "@/services/user/getUserByEmail";
import { verifyPassword } from "../utils/hashPassword";

export const authOptions = {
	...authConfig,
	providers: [
		Credentials({
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "mot de passe", type: "password" },
			},
			async authorize(credentials) {
				// Validate field with zod
				const validationResult = ReadAccountValidation.safeParse(credentials);

				if (!validationResult.success) {
					throw new Error("Champs invalides");
				}

				const { email, password } = validationResult.data;

				// Find if email exist
				const user = await getUserByEmail(email);
				if (user?.message) throw new Error(user?.message);

				// Find if email is validate
				if (!user?.email_verification) {
					throw new Error(
						"Vous devez confirmer votre adresse email avant de vous connecter.",
					);
				}

				// Hash the password
				const isPasswordValid = await verifyPassword(password, user.password);
				if (!isPasswordValid)
					throw new Error("Email ou mot de passe invalide.");

				return {
					id: user.id,
					email: user.email,
					label: user.label,
					id_role: user.id_role,
				};
			},
		}),
	],
};

// Handler for API auth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
