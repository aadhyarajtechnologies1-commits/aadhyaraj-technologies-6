const LOGO_URL =
  "https://raw.githubusercontent.com/aadhyarajtechnologies1-commits/aadhyaraj-technologies/main/logo3.png";

const LINKEDIN_URL =
  "https://www.linkedin.com/company/aadhyaraj-technologies";

const WEBSITE_URL = "https://aadhyarajtechnologies.com";

/* ================= BASE TEMPLATE ================= */
const baseTemplate = (content) => `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:20px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #eee;">

          <!-- HEADER -->
          <tr>
            <td style="background:#d7f5d1;text-align:center;padding:20px;">
              <img src="${LOGO_URL}" width="120"/>
              <div style="font-size:20px;font-weight:bold;color:#0e7c61;">
                AadhyaRaj Technologies
              </div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:20px;font-family:Arial;font-size:14px;color:#333;">

              ${content}

              <!-- SIGNATURE -->
              <p style="margin-top:25px;">
                Regards,<br/>
                <strong>AadhyaRaj Technologies Team</strong>
              </p>

              <!-- BUTTONS -->
              <div style="text-align:center;margin-top:25px;">

                <a href="${WEBSITE_URL}"
                  style="display:inline-block;background:#0b5ed7;color:#fff;
                  padding:10px 18px;text-decoration:none;border-radius:4px;
                  margin-right:10px;font-weight:bold;">
                  Visit Our Website
                </a>

                <a href="${LINKEDIN_URL}"
                  style="display:inline-block;background:#0b5ed7;color:#fff;
                  padding:10px 18px;text-decoration:none;border-radius:4px;
                  font-weight:bold;">
                  Follow on LinkedIn
                </a>

              </div>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f1f1f1;text-align:center;padding:15px;font-size:13px;">
              <p><strong>Aadhyaraj Technologies</strong></p>
              <p>© 2026 Aadhyaraj Technologies</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
`;

/* ================= USER EMAIL ================= */
export const getUserEmail = ({ name }) =>
  baseTemplate(`
    <h2>Dear ${name},</h2>
    <p>We’ve received your message and our team will get back to you shortly.</p>
    <p>We appreciate your interest in Aadhyaraj Technologies.</p>
  `);

/* ================= ADMIN EMAIL ================= */
export const getAdminEmail = ({ name, email, phone, subject, message }) =>
  baseTemplate(`
    <h3>New Contact Form Submission</h3>

    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Subject:</b> ${subject}</p>
    <p><b>Message:</b> ${message}</p>
  `);