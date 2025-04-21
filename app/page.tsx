import Presentation from "@/components/Presentation";
import RegisterForm from "@/features/register/RegisterForm";

export default function Home() {
	return (
		<main className="h-fit min-h-[85vh] p-2 sm:grid sm:grid-cols-2 sm:gap-2 lg:gap-4 lg:pt-10 2xl:px-60">
			<Presentation />
			<RegisterForm />
		</main>
	);
}
