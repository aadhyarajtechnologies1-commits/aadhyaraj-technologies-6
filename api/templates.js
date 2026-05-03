const LOGO_URL = "https://aadhyaraj-technologies.vercel.app/logo3.png";
const LINKEDIN_URL = "https://www.linkedin.com/company/aadhyaraj-technologies";
const WEBSITE_URL = "https://aadhyarajtechnologies.com";

// MAIN WRAPPER (EMAIL SAFE)
const baseTemplate = (content: string) => `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:20px 0;font-family:Arial,sans-serif;">
  <tr>
    <td align="center">

      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;">

        <!-- HEADER -->
        <tr>
          <td align="center" style="background:#d7f5d1;padding:20px;">
            <img src="${LOGO_URL}" width="150" style="display:block;margin-bottom:10px;" />
            <div style="font-size:22px;font-weight:bold;color:#0e7c61;">
              AadhyaRaj Technologies
            </div>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:25px;color:#333;font-size:14px;line-height:1.6;">
            ${content}
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="background:#f1f1f1;padding:20px;font-size:14px;color:#777;">
            
            <p style="margin:5px 0;"><strong>Aadhyaraj Technologies</strong></p>

            <p style="margin:5px 0;">
              <a href="${WEBSITE_URL}" style="color:#0b5ed7;text-decoration:none;">
                Visit Website
              </a>
            </p>

            <p style="margin:5px 0;">
              <a href="${LINKEDIN_URL}" style="color:#0b5ed7;text-decoration:none;">
                Follow on LinkedIn
              </a>
            </p>

            <p style="margin-top:10px;color:#aaa;">
              © 2026 Aadhyaraj Technologies
            </p>

          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
`;


// ✅ ADMIN EMAIL
export const getAdminEmail = ({ name, email, phone, subject, message }: any) => {
  const content = `
    <h2 style="margin:0 0 10px;">New Contact Form Submission</h2>

    <table width="100%" cellpadding="8" cellspacing="0" style="border:1px solid #ddd;border-collapse:collapse;">
      <tr><td><b>Name</b></td><td>${name}</td></tr>
      <tr><td><b>Email</b></td><td>${email}</td></tr>
      <tr><td><b>Phone</b></td><td>${phone}</td></tr>
      <tr><td><b>Subject</b></td><td>${subject}</td></tr>
      <tr><td><b>Message</b></td><td>${message}</td></tr>
    </table>

    <p style="margin-top:20px;text-align:center;">
      <a href="mailto:${email}" style="background:#0b5ed7;color:#fff;padding:10px 15px;text-decoration:none;">
        Reply to ${name}
      </a>
    </p>
  `;

  return baseTemplate(content);
};


// ✅ USER EMAIL
export const getUserEmail = ({ name }: any) => {
  const content = `
    <h2>Dear ${name},</h2>

    <p>We’ve received your message and our team will get back to you shortly.</p>

    <p>Thank you for contacting <strong>Aadhyaraj Technologies</strong>.</p>

    <p style="text-align:center;margin:25px 0;">
      <a href="${WEBSITE_URL}" style="background:#0b5ed7;color:#fff;padding:10px 15px;text-decoration:none;">
        Visit Website
      </a>
    </p>

    <p>
      Regards,<br/>
      <strong>Aadhyaraj Technologies Team</strong>
    </p>
  `;

  return baseTemplate(content);
};