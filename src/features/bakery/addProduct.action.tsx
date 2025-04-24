import { createProduct } from "@/entities/bakery/bakery.service";

import type { productType } from "@/types/definitions";

export async function addProduct(product: productType) {
	return await createProduct(product);
}
