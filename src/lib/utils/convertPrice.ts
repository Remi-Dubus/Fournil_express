export function convertToCent(price: number) {
	return Math.round(Number(price) * 100);
}

export const convertFromCents = (cents: number) => {
	return (cents / 100).toFixed(2);
};
