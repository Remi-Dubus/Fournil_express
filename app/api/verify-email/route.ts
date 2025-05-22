import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const token = searchParams.get("token");

	// If the token not exist redirect with params missing
	if (!token) {
		return new Response(null, {
			status: 302,
			headers: { Location: "/verify-email?status=missing" },
		});
	}

	// Search company with the email verification token on database
	const company = await sql`
		SELECT * FROM company
		WHERE email_verification_token = ${token}
	`;

	// If user not exist redirect on 404 not found
	if (!company || company.length === 0)
		return new Response("Token invalide", { status: 400 });

	const userData = company[0];

	// If the token of email verification is expires redirect with params expired
	if (new Date() > new Date(userData.email_verification_expires)) {
		return new Response(null, {
			status: 302,
			headers: { Location: "/verify-email?status=expired" },
		});
	}

	// Update statut of email verification on database and return success
	await sql`
		UPDATE company
		SET email_verification = TRUE,
			email_verification_token = NULL,
			email_verification_expires = NULL
		WHERE id = ${userData.id}
	`;

	return new Response(null, {
		status: 302,
		headers: {
			Location: "/verify-email",
		},
	});
}
