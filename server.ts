import dotenv from "dotenv";
dotenv.config();

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import admin from "firebase-admin";
import { getAdminEmail, getUserEmail } from "./src/emails/templates.js";

import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Firebase init
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SMTP CONFIG
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error) => {
  if (error) console.log("SMTP ERROR:", error);
  else console.log("SMTP READY ✅");
});

async function startServer() {
  const PORT = 3000;

  app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // =========================
  // CONTACT API
  // =========================
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    try {
      // ✅ SAVE TO FIRESTORE
      await db.collection("contacts").add({
        name,
        email,
        phone,
        subject,
        message,
        createdAt: new Date(),
      });
      const adminHtml = getAdminEmail({ name, email, phone, subject, message });
      const userHtml = getUserEmail({ name });

      await transporter.sendMail({
        from: `Aadhyaraj Technologies <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission - ${name}`,
        html: adminHtml,
      });

      await transporter.sendMail({
        from: `Aadhyaraj Technologies <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank you for contacting Aadhyaraj Technologies",
        html: userHtml,
      });

          res.status(200).json({ success: true });

      } catch (error) {
        console.error("EMAIL ERROR:", error);
        res.status(500).json({ success: false });
      }
     });


  // =========================
  // JOB API (UNCHANGED)
  // =========================
  app.post("/api/apply", async (req, res) => {
    const { name, email, phone, experience, message, jobTitle, fileName } =
      req.body;

    console.log(`[JOB APPLICATION SIMULATION]`);
    console.log(`To: Info@aadhyarajtech.com`);
    console.log(`From: ${email} (${name})`);
    console.log(`Job: ${jobTitle}`);
    console.log(`Experience: ${experience}`);
    console.log(`Resume: ${fileName || "Not provided"}`);
    console.log(`Message: ${message}`);

    res.json({ success: true });
  });

  // =========================
  // VITE SERVER
  // =========================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(vite.middlewares);

    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;

      if (url.includes(".") && !url.endsWith(".html")) {
        return next();
      }

      try {
        let template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        next(e);
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();