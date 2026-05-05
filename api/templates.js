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
            <td style="text-align:center;padding:20px;">
              <img src="${LOGO_URL}" width="120" style="display:block;margin:0 auto;" />
              <div style="font-size:20px;font-weight:bold;color:#0e7c61;">
                AadhyaRaj Technologies
              </div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:20px;font-family:Arial;font-size:14px;color:#333;line-height:1.6;">
              ${content}

          <!-- FOOTER -->
          <tr>
            <td style="background:#f1f1f1;text-align:center;padding:15px;font-size:13px;">
              <p><strong>Aadhyaraj Technologies</strong></p>
              <p>Email: info@aadhyarajtechnologies.com</p>
              <p><a href="${LINKEDIN_URL}">Connect on LinkedIn</a></p>
              <p>© 2026 Aadhyaraj Technologies. All rights reserved.</p>
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
    <p>Dear ${name},</p>

    <p>We’ve received your message and our team will get back to you shortly.</p>

    <p>We appreciate your interest in Aadhyaraj Technologies.</p>

    
    <!-- SIGNATURE -->
      <p style="margin-top:20px;">
       Regards,<br/>
       <strong>AadhyaRaj Technologies Team</strong>
       </p>
       </td>
       </tr>

    <!-- BUTTONS -->
    <div style="text-align:center;margin:20px 0;">
      <a href="${WEBSITE_URL}"
        style="display:inline-block;background:#0b5ed7;color:#fff;
        padding:10px 18px;text-decoration:none;border-radius:4px;margin-right:10px;">
        Visit Our Website
      </a>

      <a href="${LINKEDIN_URL}"
        style="display:inline-block;background:#0b5ed7;color:#fff;
        padding:10px 18px;text-decoration:none;border-radius:4px;">
        Follow on LinkedIn
      </a>
    </div>
  `);

/* ================= ADMIN EMAIL ================= */
export const getAdminEmail = ({ name, email, phone, subject, message }) =>
  baseTemplate(`
    <p><strong>New Contact Form Submission</strong></p>

    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phone}</p>
    <p>Subject: ${subject}</p>
    <p>Message: ${message}</p>

    <!-- REPLY BUTTON -->
    <div style="text-align:center;margin-top:20px;">
      <a href="mailto:${email}?subject=Re: ${subject || "Your enquiry"}"
        style="display:inline-block;background:#0b5ed7;color:#fff;
        padding:10px 18px;text-decoration:none;border-radius:4px;">
        Reply ${name}
      </a>
    </div>
  `);