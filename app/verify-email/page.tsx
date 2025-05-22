import { Suspense } from "react";

import VerifyEmail from "@/features/auth/VerifyEmail";

export default function Page() {
	return (
		<Suspense fallback={<p>Chargement...</p>}>
			<VerifyEmail />
		</Suspense>
	);
}
