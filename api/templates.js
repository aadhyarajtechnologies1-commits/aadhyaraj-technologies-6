const LOGO_URL = "https://raw.githubusercontent.com/aadhyarajtechnologies1-commits/aadhyaraj-technologies/main/logo3.png";
const LINKEDIN_URL = "https://www.linkedin.com/company/aadhyaraj-technologies";
const WEBSITE_URL = "https://aadhyarajtechnologies.com";

const baseTemplate = (content) => `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:20px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #eee;">

          <tr>
            <td style="background:#d7f5d1;text-align:center;padding:20px;">
              <img src="${LOGO_URL}" width="120"/>
              <div style="font-size:20px;font-weight:bold;color:#0e7c61;">
                AadhyaRaj Technologies
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:20px;font-family:Arial;font-size:14px;color:#333;">
              ${content}
            </td>
          </tr>

          <tr>
            <td style="background:#f1f1f1;text-align:center;padding:15px;font-size:13px;">
              <p>Aadhyaraj Technologies</p>
              <p><a href="${LINKEDIN_URL}">LinkedIn</a></p>
              <p>© 2026</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
`;

export const getUserEmail = ({ name }) =>
  baseTemplate(`<h2>Dear ${name}</h2><p>Thanks for contacting us.</p>`);

export const getAdminEmail = ({ name, email, phone, subject, message }) =>
  baseTemplate(`
    <h3>New Contact</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Subject:</b> ${subject}</p>
    <p><b>Message:</b> ${message}</p>
  `);