import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { getUserEmail, getAdminEmail } from "./emailTemplates";

/* =========================
   EMAIL TEMPLATES (INLINE)
========================= */

const baseTemplate = (content: string) => `
  <div style="margin:0;padding:20px;background:#f4f6f8;font-family:Arial;">
    <div style="max-width:600px;margin:auto;background:#fff;padding:20px;border-radius:10px;">
      ${content}
      <hr style="margin-top:30px;">
      <p style="font-size:12px;color:#888;text-align:center;">
        Aadhyaraj Technologies © ${new Date().getFullYear()}
      </p>
    </div>
  </div>
`;

const getUserEmail = (name: string) => baseTemplate(`
  <h2>Hi ${name},</h2>
  <p>Thanks for contacting <b>Aadhyaraj Technologies</b>.</p>
  <p>Our team will get back to you shortly.</p>
`);

const getAdminEmail = (data: any) => baseTemplate(`
  <h2>New Contact Form Submission</h2>

  <p><b>Name:</b> ${data.name}</p>
  <p><b>Email:</b> ${data.email}</p>
  <p><b>Phone:</b> ${data.phone}</p>
  <p><b>Subject:</b> ${data.subject}</p>
  <p><b>Message:</b> ${data.message}</p>
`);

/* =========================
   HANDLER
========================= */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Missing EMAIL_USER or EMAIL_PASS in environment variables");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail APP PASSWORD
      },
    });

    // ================= USER EMAIL =================
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting Aadhyaraj Technologies",
      html: getUserEmail({ name }),
    });

    // ================= ADMIN EMAIL =================
    await transporter.sendMail({
      from: `"Aadhyaraj Technologies" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: subject || "New Contact Form Submission",
      html: getAdminEmail({ name, email, phone, subject, message }),
    });

    return res.status(200).json({
      success: true,
      message: "Emails sent successfully",
    });

  } catch (error: any) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}