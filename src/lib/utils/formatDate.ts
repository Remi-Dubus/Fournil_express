export default function formatDate(date: string) {
	const formatedDate = date.split("T")[0].split("-").reverse().join("/");
	const getDate = new Date(date);
	const getHour = getDate?.getHours().toString();
	const getMin = getDate?.getMinutes().toString().padStart(2, "0");
	const formatedDateResult = `${formatedDate} à ${Number.parseInt(getHour) + 2}h${getMin}`;
	return formatedDateResult;
}
