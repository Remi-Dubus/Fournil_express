import argon2 from "argon2";

const hashingOptions = {
	memoryCost: 19 * 2 ** 10,
	timeCost: 2,
	parallellism: 1,
};

export const hashPassword = async (password: string) => {
	return await argon2.hash(password, hashingOptions);
};

export const verifyPassword = async (password: string, passwordDB: string) => {
	return await argon2.verify(passwordDB, password);
};
