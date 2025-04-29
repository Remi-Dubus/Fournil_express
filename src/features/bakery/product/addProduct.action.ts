import { createProduct } from "@/entities/bakery/product/create";

import type { productType } from "@/types/definitions";

export async function addProduct(product: productType) {
	return await createProduct(product);
}
