import type { Session, User, SessionStrategy } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authConfig = {
	pages: {
		signIn: "/login",
		error: "/auth/error",
	},

	session: {
		strategy: "jwt" as SessionStrategy,
		maxAge: 30 * 24 * 60 * 60,
	},

	callbacks: {
		async jwt({ token, user }: { token: JWT; user?: User }) {
			if (user) {
				token.id = user.id;
				token.label = user.label;
				token.email = user.email;
				token.id_role = user.id_role;
			}
			return token;
		},

		async session({ session, token }: { session: Session; token: JWT }) {
			session.user = {
				id: token.id,
				label: token.label,
				email: token.email,
				id_role: token.id_role,
			};
			return session;
		},
	},
};
