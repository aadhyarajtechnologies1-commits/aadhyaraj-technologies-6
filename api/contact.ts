import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

// ================= TEMPLATE =================

const baseTemplate = (content: string) => `
  <div style="background:#f4f6f8;padding:20px;font-family:Arial;">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;">
      
      <div style="background:#d7f5d1;padding:15px;">
        <img src="https://aadhyaraj-technologies.vercel.app/logo3.png" width="140"/>
        <h2 style="margin:5px 0;color:#0e7c61;">Aadhyaraj Technologies</h2>
      </div>

      <div style="padding:20px;">
        ${content}
      </div>

      <div style="background:#f1f1f1;padding:15px;text-align:center;font-size:12px;">
        © 2026 Aadhyaraj Technologies
      </div>

    </div>
  </div>
`;

const getUserEmail = (name: string) => {
  return baseTemplate(`
    <h2>Dear ${name},</h2>
    <p>We’ve received your message. Our team will contact you soon.</p>
  `);
};

const getAdminEmail = (data: any) => {
  return baseTemplate(`
    <h2>New Contact Form Submission</h2>
    <p><b>Name:</b> ${data.name}</p>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Phone:</b> ${data.phone}</p>
    <p><b>Message:</b> ${data.message}</p>
  `);
};

// ================= API =================

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

    // USER EMAIL
    await transporter.sendMail({
      from: `"Aadhyaraj Technologies" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting us",
      html: getUserEmail(name),
    });

    // ADMIN EMAIL
    await transporter.sendMail({
      from: `"Aadhyaraj Technologies" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: subject || "New Contact Form",
      html: getAdminEmail({ name, email, phone, message }),
    });

    return res.status(200).json({ success: true });

  } catch (error: any) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}