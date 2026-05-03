import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { getUserEmail, getAdminEmail } from "./emailTemplates.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, subject, message } = req.body;
    console.log("TEMPLATE TEST USER:", getUserEmail({ name }));
    console.log("TEMPLATE TEST ADMIN:", getAdminEmail({ name, email, phone, subject, message }));

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ USER EMAIL (FULL DESIGN)
    await transporter.sendMail({
      from: `"Aadhyaraj Technologies" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting Aadhyaraj Technologies",
      html: html: `
      <h1>TEST EMAIL</h1>
      <img src="https://aadhyaraj-technologies.vercel.app/logo3.png" width="200"/>
      <p>Footer test</p>
    `,
    });

    // ✅ ADMIN EMAIL (FULL DESIGN)
    await transporter.sendMail({
      from: `"Aadhyaraj Technologies" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: subject || "New Contact Form Submission",
      html: getAdminEmail({ name, email, phone, subject, message }),
    });

    return res.status(200).json({ success: true });

  } catch (error: any) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}