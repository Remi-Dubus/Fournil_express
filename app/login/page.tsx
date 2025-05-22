import Presentation from "@/components/Presentation";
import LoginForm from "@/features/auth/LoginForm";
import RegisterForm from "@/features/auth/RegisterForm";
import { Suspense } from "react";

export default function Home() {
	return (
		<main className="h-fit min-h-[85vh] p-2 sm:grid sm:grid-cols-2 sm:gap-2 lg:gap-4 lg:pt-10 2xl:px-60">
			<Presentation />
			<Suspense>
				<LoginForm />
			</Suspense>
			<RegisterForm />
		</main>
	);
}
