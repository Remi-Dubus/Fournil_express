import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		const token = req.nextauth.token;
		const url = req.nextUrl.clone();
		const pathname = url.pathname;

		// Si pas connecté : on le laisse aller sur login
		if (!token) {
			if (pathname !== "/login") {
				url.pathname = "/login";
				return NextResponse.redirect(url);
			}
			return NextResponse.next();
		}

		const role = token.id_role;

		// Protection des routes en fonction du rôle
		if (pathname.startsWith("/bakery") && role !== 1) {
			url.pathname = "/";
			return NextResponse.redirect(url);
		}
		if (pathname.startsWith("/restaurant") && role !== 2) {
			url.pathname = "/";
			return NextResponse.redirect(url);
		}
		if (pathname.startsWith("/admin") && role !== 3) {
			url.pathname = "/";
			return NextResponse.redirect(url);
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	},
);

// Application du middleware sur ces chemins
export const config = {
	matcher: ["/admin/:path*", "/bakery/:path*", "/restaurant/:path*"],
};
