import nodemailer from "nodemailer";

import type { SendEmailType } from "@/types/definitions";

export async function sendEmail({ to, subject, text, html }: SendEmailType) {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		secure: true,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});

	const mailOptions = {
		from: process.env.SMTP_FROM_EMAIL,
		to,
		subject,
		text,
		html,
	};

	await transporter.sendMail(mailOptions);
}
