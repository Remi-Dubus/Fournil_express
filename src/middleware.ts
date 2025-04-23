import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		const token = req.nextauth.token;
		const url = req.nextUrl.clone();
		const pathname = url.pathname;

		// If token do not exist redirect to login page
		if (!token) {
			if (pathname !== "/login") {
				url.pathname = "/login";
				return NextResponse.redirect(url);
			}
			return NextResponse.next();
		}

		const role = token.id_role;

		// Verify if role match with role_id

		if (pathname.startsWith("/restaurant") && role !== 1) {
			url.pathname = "/";
			return NextResponse.redirect(url);
		}
		if (pathname.startsWith("/bakery") && role !== 2) {
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

// Path middleware block
export const config = {
	matcher: ["/admin/:path*", "/bakery/:path*", "/restaurant/:path*"],
};
