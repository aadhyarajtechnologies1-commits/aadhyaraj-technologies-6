const LOGO_URL = "https://aadhyaraj-technologies.vercel.app/logo3.png";
const LINKEDIN_URL = "https://www.linkedin.com/company/aadhyaraj-technologies";
const WEBSITE_URL = "https://aadhyarajtechnologies.com";

// Wrapper
const baseTemplate = (content) => `
  <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;">

            <tr>
              <td style="background:#d7f5d1;padding:15px;text-align:center;">
                <img src="${LOGO_URL}" width="140" />
                <div style="font-size:22px;font-weight:bold;color:#0e7c61;">
                  AadhyaRaj Technologies
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:20px;">
                ${content}
              </td>
            </tr>

            <tr>
              <td style="background:#f1f1f1;padding:15px;text-align:center;font-size:14px;">
                <p><strong>Aadhyaraj Technologies</strong></p>
                <p><a href="${LINKEDIN_URL}">LinkedIn</a></p>
                <p>© 2026 Aadhyaraj Technologies</p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </div>
`;

// USER EMAIL
export const getUserEmail = ({ name }) => {
  const content = `
    <h2>Dear ${name},</h2>
    <p>We’ve received your message and will get back to you soon.</p>
  `;
  return baseTemplate(content);
};

// ADMIN EMAIL
export const getAdminEmail = ({ name, email, phone, subject, message }) => {
  const content = `
    <h3>New Contact Form Submission</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Subject:</b> ${subject}</p>
    <p><b>Message:</b> ${message}</p>
  `;
  return baseTemplate(content);
};