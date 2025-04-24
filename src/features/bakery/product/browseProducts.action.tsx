import { readAllProducts } from "@/entities/bakery/product/read";
import { convertFromCents } from "@/lib/utils/convertPrice";

export async function browseProducts(id_bakery: string) {
	const products = await readAllProducts(id_bakery);

	const convertPriceProducts = products.map((product) => ({
		...product,
		price: Number.parseFloat(convertFromCents(product.price)),
	}));

	return convertPriceProducts;
}
