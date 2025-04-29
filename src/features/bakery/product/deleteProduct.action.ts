import { deleteProduct } from "@/entities/bakery/product/delete";

import type { deleteType, productType } from "@/types/definitions";

export async function destroyProduct(ids: deleteType) {
	return await deleteProduct(ids);
}
