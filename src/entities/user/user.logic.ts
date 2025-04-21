export function companyRole(role: string) {
	if (role === "restaurant") {
		return 1;
	}
	if (role === "bakery") {
		return 2;
	}
	return null;
}
