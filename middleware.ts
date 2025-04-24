import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	(req) => {
		const token = req.nextauth.token;
		const url = req.nextUrl.clone();
		const pathname = url.pathname;
		console.log("middleware actif - pathname:", pathname);
		// Redirection if token not found
		if (!token) {
			if (pathname !== "/") {
				url.pathname = "/";
				return NextResponse.redirect(url);
			}
			return NextResponse.next();
		}

		const id_role = token.id_role;

		// Redirection if role on url do not match with the id_role
		if (pathname.startsWith("/restaurant") && id_role !== 1) {
			url.pathname = "/";
			return NextResponse.redirect(url);
		}
		if (pathname.startsWith("/bakery") && id_role !== 2) {
			url.pathname = "/";
			return NextResponse.redirect(url);
		}
		if (pathname.startsWith("/admin") && id_role !== 3) {
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

// Blocked path
export const config = {
	matcher: ["/admin/:path*", "/bakery/:path*", "/restaurant/:path*"],
};
