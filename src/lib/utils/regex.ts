export const regex = {
	emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
	passwordRegex:
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
	companyRegex: /^[a-zA-ZàÀáÁâÂéÉèÈêÊëËîÎïÏûÛüÜôÔöÖÇç-\s]+$/,
	phoneRegex:
		/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/,
	priceRegex: /^\d+(\.\d{2})?$/,
	productRegex: /^[a-zA-ZàÀáÁâÂéÉèÈêÊëËîÎïÏûÛüÜôÔöÖÇç-\s]+$/g,
	quantityRegex: /^[0-9]+$/,
};
