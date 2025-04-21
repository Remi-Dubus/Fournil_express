import { createAccount } from "@/entities/user/user.service";

import type { registerType } from "@/assets/types/definitions";

export async function addAccount(registerForm: registerType) {
	return await createAccount(registerForm);
}
