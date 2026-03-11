import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Database setup
  const db = new Database("appointments.db");
  db.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      service TEXT,
      date TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  app.use(express.json());

  // API routes
  app.post("/api/appointments", async (req, res) => {
    const { name, phone, service, date, message } = req.body;

    try {
      // Save to database
      const stmt = db.prepare(
        "INSERT INTO appointments (name, phone, service, date, message) VALUES (?, ?, ?, ?, ?)"
      );
      stmt.run(name, phone, service, date, message);

      // Send email notification
      const adminEmail = process.env.ADMIN_EMAIL || "contact.malikdanial@gmail.com";
      
      // Only attempt to send email if SMTP is configured
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_PORT === "465",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const mailOptions = {
          from: process.env.SMTP_FROM || "noreply@drbashirdental.com",
          to: adminEmail,
          subject: `New Appointment Request: ${name}`,
          text: `
            New appointment request received:
            
            Name: ${name}
            Phone: ${phone}
            Service: ${service}
            Date: ${date}
            Message: ${message}
          `,
          html: `
            <h3>New Appointment Request</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Message:</strong> ${message}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
      } else {
        console.log("SMTP not configured. Email not sent, but submission saved to DB.");
        console.log("Submission details:", { name, phone, service, date, message });
      }

      res.status(200).json({ success: true, message: "Your appointment request has been sent successfully." });
    } catch (error) {
      console.error("Error processing appointment:", error);
      res.status(500).json({ success: false, message: "Failed to process appointment request." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
