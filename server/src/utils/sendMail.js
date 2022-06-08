import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	auth: {
		user: process.env.NODE_MAILER_EMAIL,
		pass: process.env.NODE_MAILER_PWD,
	},
});

export const sendMail = (email, password) => {
	const msgTemplate = `
            <h1>Signup Successfull Please login with these credentials. Thanks</h1>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
        `;
	const mailOptions = {
		from: "saveondeve@gmail.com",
		to: email,
		subject: "Welcome to Test Task",
		html: msgTemplate,
	};
	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				reject(error);
			} else {
				console.log("Email sent: " + info.response);
				resolve(true);
			}
		});
	});
};
