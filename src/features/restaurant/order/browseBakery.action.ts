import { readAllBakery } from "@/entities/restaurant/bakery/readAll";

export async function browseBakery() {
	return await readAllBakery();
}
