export function getRoleSlug(id_role: number): string {
	switch (id_role) {
		case 1:
			return "restaurant";
		case 2:
			return "bakery";
		case 3:
			return "admin";
		default:
			return "user";
	}
}

export function slugify(text: string): string {
	return text
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-zA-Z0-9 -]/g, "")
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}
