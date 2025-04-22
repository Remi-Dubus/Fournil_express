"use client";

import { titleFont } from "@/ui/font";

import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { addAccount } from "./register.action";

import { regex } from "../../assets/regex";
import data from "../../assets/data/login.json";
import errorData from "../../assets/data/error.json";

import type { registerType } from "@/types/definitions";

export default function RegisterForm() {
	// Useform
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<registerType>();

	// Button for submit the register form
	const handleRegister = async (registerForm: registerType) => {
		try {
			const response = await addAccount(registerForm);

			if (!response?.success) {
				toast.error(response.message);
				return;
			}

			toast.success(response.message);
			reset();
			redirect("#connect");
		} catch (err) {
			toast.error("Une erreur est survenue.");
		}
	};

	return (
		<article
			id="register"
			className="bg-light rounded-lg mb-16 shadow-dark shadow-sm sm:col-span-2 lg:row-start-2 lg:col-span-1 lg:col-start-2 xl:w-10/12"
		>
			<section className="p-4 space-y-4 md:space-y-6 sm:p-8">
				<h2
					className={`${titleFont.className} text-2xl text-center text-interest lg:text-4xl`}
				>
					{data.titleRegister}
				</h2>
				<form
					className="space-y-4 flex flex-col items-center md:space-y-6 lg:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4 lg:flex"
					onSubmit={handleSubmit(handleRegister)}
				>
					<fieldset className="w-full sm:col-span-2">
						<label htmlFor="company" className="block mb-2 text-dark">
							{data.companyName}
						</label>
						<input
							{...register("company", {
								required: errorData.required,
								minLength: {
									value: 4,
									message: errorData.minChar,
								},
								maxLength: {
									value: 150,
									message: errorData.maxChar,
								},
								pattern: {
									value: regex.companyRegex,
									message: errorData.email,
								},
							})}
							type="text"
							id="company"
							className="bg-white text-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
							placeholder='Boulangerie "Au bon pain"'
						/>
						<p className="text-red-800">{errors.company?.message}</p>
					</fieldset>
					<fieldset className="w-full sm:col-span-2">
						<label htmlFor="email" className="block mb-2 text-dark">
							{data.email}
						</label>
						<input
							{...register("email", {
								required: errorData.required,
								minLength: {
									value: 10,
									message: errorData.minChar,
								},
								maxLength: {
									value: 150,
									message: errorData.maxChar,
								},
								pattern: {
									value: regex.emailRegex,
									message: errorData.email,
								},
							})}
							type="email"
							id="email"
							className="bg-white text-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
							placeholder="name@company.com"
						/>
						<p className="text-red-800">{errors.email?.message}</p>
					</fieldset>
					<fieldset className="w-full sm:col-span-2">
						<label htmlFor="phone" className="block mb-2 text-dark">
							{data.phone}
						</label>
						<input
							{...register("phone", {
								required: errorData.required,
								minLength: {
									value: 10,
									message: errorData.minChar,
								},
								maxLength: {
									value: 20,
									message: errorData.maxChar,
								},
								pattern: {
									value: regex.phoneRegex,
									message: errorData.phone,
								},
							})}
							type="tel"
							id="tel"
							className="bg-white text-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
							placeholder="+33606060606"
						/>
						<p className="text-red-800">{errors.phone?.message}</p>
					</fieldset>
					<fieldset className="w-full sm:col-span-2">
						<legend className="block mb-2 text-dark">{data.role}</legend>
						<div className="flex justify-between">
							<input
								{...register("role", {
									required: errorData.required,
								})}
								type="radio"
								className="focus:ring-primary-600 focus:border-primary-600 accent-dark"
								name="role"
								value="restaurant"
								defaultChecked
							/>
							<label
								htmlFor="restaurant"
								className="text-dark focus:ring-primary-600 w-full p-2.5"
							>
								{data.restaurant}
							</label>
							<input
								{...register("role", {
									required: errorData.required,
								})}
								type="radio"
								className="focus:ring-primary-600 focus:border-primary-600 accent-dark"
								name="role"
								value="bakery"
							/>
							<label
								htmlFor="bakery"
								className="text-dark focus:ring-primary-600 w-full p-2.5"
							>
								{data.bakery}
							</label>
						</div>
						<p className="text-red-800">{errors.role?.message}</p>
					</fieldset>
					<fieldset className="w-full sm:col-span-2">
						<label htmlFor="password" className="block mb-2 text-dark">
							{data.password}
						</label>
						<input
							{...register("password", {
								required: errorData.required,
								minLength: {
									value: 10,
									message: errorData.minChar,
								},
								maxLength: {
									value: 150,
									message: errorData.maxChar,
								},
								pattern: {
									value: regex.passwordRegex,
									message: errorData.password,
								},
							})}
							type="password"
							id="password"
							placeholder="••••••••••••••••"
							className="bg-white text-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
						/>{" "}
						<p className="text-red-800">{errors.password?.message}</p>
					</fieldset>
					<fieldset className="w-full sm:col-span-2">
						<label htmlFor="confirm-password" className="block mb-2 text-dark">
							{data.confirmPassword}
						</label>
						<input
							{...register("confirm", {
								required: errorData.required,
								pattern: {
									value: regex.passwordRegex,
									message: errorData.password,
								},
								validate: (value: string) => {
									if (value !== watch("password")) {
										return errorData.confirmPassword;
									}
								},
							})}
							type="password"
							id="confirm-password"
							placeholder="••••••••••••••••"
							className="bg-white text-dark rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
						/>
						<p className="text-red-800">{errors.confirm?.message}</p>
					</fieldset>
					<button
						type="submit"
						className="w-48 mt-5 h-12 shadow-dark shadow-sm text-light bg-dark hover:bg-primary-700 focus:ring-4 rounded-lg px-5 py-1 text-center hover:scale-105 active:text-dark active:bg-interest sm:col-start-2 sm:col-end-4 sm:w-full sm:mt-6"
					>
						{data.createAccount}
					</button>
				</form>
				<p className="text-center h-16 py-4 sm:hidden">
					{data.alreadyRegister}
					<Link
						href="#connect"
						className="text-interest active:text-orange-200 "
					>
						{data.titleConnection}
					</Link>
				</p>
			</section>
		</article>
	);
}
