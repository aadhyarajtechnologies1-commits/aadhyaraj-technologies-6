const LOGO_URL = "https://aadhyaraj-technologies.vercel.app/logo3.png";
const LINKEDIN_URL = "https://www.linkedin.com/company/aadhyaraj-technologies";
const WEBSITE_URL = "https://aadhyarajtechnologies.com";

// Wrapper
const baseTemplate = (content) => `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:20px 0;font-family:Arial,sans-serif;">
    <tr>
      <td align="center">

        <!-- MAIN CONTAINER -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-collapse:collapse;">

          <!-- HEADER -->
          <tr>
            <td style="background:#d7f5d1;padding:20px;text-align:center;">
              <img src="${LOGO_URL}" width="150" style="display:block;margin:0 auto;" />
              <div style="font-size:24px;font-weight:bold;color:#0e7c61;margin-top:10px;">
                AadhyaRaj Technologies
              </div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:25px;color:#333333;font-size:14px;line-height:1.6;">
              ${content}
            </td>
          </tr>

          <!-- CTA BUTTONS -->
          <tr>
            <td align="center" style="padding:20px;">

              <!-- WEBSITE BUTTON -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td bgcolor="#0b5ed7" style="padding:12px 20px;">
                    <a href="${WEBSITE_URL}" target="_blank"
                      style="color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;">
                      Visit Website
                    </a>
                  </td>
                </tr>
              </table>

              <br/>

              <!-- LINKEDIN BUTTON -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td bgcolor="#0b5ed7" style="padding:12px 20px;">
                    <a href="${LINKEDIN_URL}" target="_blank"
                      style="color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;">
                      Follow on LinkedIn
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f1f1f1;padding:20px;text-align:center;font-size:13px;color:#777777;">
              <p style="margin:5px 0;"><strong>Aadhyaraj Technologies</strong></p>

              <p style="margin:5px 0;">
                <a href="mailto:info@aadhyarajtechnologies.com"
                   style="color:#0b5ed7;text-decoration:none;">
                   info@aadhyarajtechnologies.com
                </a>
              </p>

              <p style="margin:5px 0;">
                <a href="${LINKEDIN_URL}"
                   style="color:#0b5ed7;text-decoration:none;">
                   LinkedIn
                </a>
              </p>

              <p style="margin-top:10px;color:#aaaaaa;">
                © 2026 Aadhyaraj Technologies. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
`;


// ================= USER EMAIL =================
export const getUserEmail = ({ name }) => {
  const content = `
    <h2 style="margin-top:0;color:#0b1f3a;">Dear ${name},</h2>

    <p>We’ve received your message and our team will get back to you shortly.</p>

    <p>We appreciate your interest in <strong>Aadhyaraj Technologies</strong>.</p>

    <p>If your inquiry is urgent, feel free to reply to this email.</p>

    <p style="margin-top:20px;">
      Regards,<br/>
      <strong>Aadhyaraj Technologies Team</strong>
    </p>
  `;

  return baseTemplate(content);
};


// ================= ADMIN EMAIL =================
export const getAdminEmail = ({ name, email, phone, subject, message }) => {
  const content = `
    <h2 style="margin-top:0;color:#0b1f3a;">New Contact Form Submission</h2>

    <p>You have received a new inquiry:</p>

    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="border:1px solid #ddd;"><strong>Name</strong></td>
        <td style="border:1px solid #ddd;">${name}</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd;"><strong>Email</strong></td>
        <td style="border:1px solid #ddd;">${email}</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd;"><strong>Phone</strong></td>
        <td style="border:1px solid #ddd;">${phone}</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd;"><strong>Subject</strong></td>
        <td style="border:1px solid #ddd;">${subject}</td>
      </tr>
      <tr>
        <td style="border:1px solid #ddd;"><strong>Message</strong></td>
        <td style="border:1px solid #ddd;">${message}</td>
      </tr>
    </table>
  `;

  return baseTemplate(content);
};