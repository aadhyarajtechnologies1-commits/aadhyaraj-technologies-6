import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { getUserEmail, getAdminEmail } from "./templates.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ USER EMAIL (USE TEMPLATE)
    await transporter.sendMail({
      from: `"Aadhyaraj Technologies" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting Aadhyaraj Technologies",
      html: getUserEmail({ name }),
    });

    // ✅ ADMIN EMAIL (USE TEMPLATE)
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