const LOGO_URL = "https://aadhyaraj-technologies.vercel.app/logo3.png";
const LINKEDIN_URL = "https://www.linkedin.com/company/aadhyaraj-technologies";
const WEBSITE_URL = "https://aadhyarajtechnologies.com"; // update if needed

// Shared wrapper (reusable layout)
const baseTemplate = (content:string) => `
  <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" 
            style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.08);">

            <!-- HEADER -->
            
            <tr>
              <td style="background:#d7f5d1;padding:15px 20px;">
                
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>

                    <!-- LOGO -->
                    <td width="80" valign="middle">
                      <img 
                       src="https://aadhyaraj-technologies-6.vercel.app/logo3.png"
                       width="140" style="display:block;border:0;"
                      />
                      
                    </td>

                    <!-- COMPANY NAME -->
                    <td valign="middle" style="text-align:left;">
                      <span style="font-size:30px;font-weight:bold;color:#0e7c61;">
                        AadhyaRaj Technologies
                      </span>
                    </td>

                  </tr>
                </table>

              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:30px;color:#333333;font-size:14px;line-height:1.6;">
                ${content}
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#f1f1f1;padding:20px;text-align:center;font-size:18px;color:#777;">
                
                <p style="margin:5px 0;"><strong>Aadhyaraj Technologies</strong></p>

                <p style="margin:5px 0;">
                  Email: 
                  <a href="mailto:info@aadhyarajtechnologies.com" 
                     style="color:#0b5ed7;text-decoration:none;">
                     info@aadhyarajtechnologies.com
                  </a>
                </p>

                <p style="margin:10px 0;">
                  <a href="${LINKEDIN_URL}" target="_blank" 
                     style="color:#0b5ed7;text-decoration:none;font-weight:bold;">
                     Connect on LinkedIn
                  </a>
                </p>

                <p style="margin-top:10px;color:#aaa;">
                  © 2026 Aadhyaraj Technologies. All rights reserved.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </div>
`;


// ================= ADMIN EMAIL =================
export const getAdminEmail = ({ name, email, phone, subject, message }:any) => {
  const content = `
    <h2 style="margin-top:0;color:#0b1f3a;">New Contact Form Submission</h2>

    <p>You have received a new inquiry from your website:</p>

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

    <div style="margin-top:20px;text-align:center;">
      <a href="mailto:${email}" 
         style="background:#0b5ed7;color:#fff;padding:12px 20px;
                text-decoration:none;border-radius:5px;display:inline-block;">
         Reply to ${name}
      </a>
    </div>
  `;

  return baseTemplate(content);
};


// ================= USER EMAIL =================
export const getUserEmail = ({ name }:any) => {
  const content = `
    <h2 style="margin-top:0;color:#0b1f3a;">Dear ${name}, </h2>

    <p>We’ve received your message and our team will get back to you shortly.</p>

    <p>We appreciate your interest in <strong>Aadhyaraj Technologies</strong>.</p>

    <!-- BUTTONS -->
    <div style="text-align:center;margin:25px 0;">

    <!-- WEBSITE BUTTON -->
    <a href="${WEBSITE_URL}" target="_blank"
      style="background:#0b5ed7;color:#fff;padding:12px 18px;
      text-decoration:none;border-radius:5px;display:inline-block;margin-right:10px;">
      Visit Website
    </a>

      <!-- LINKEDIN BUTTON -->
      <a href="https://www.linkedin.com/company/aadhyaraj-technologies" target="_blank"
        style="background:#0b5ed7;color:#fff;padding:12px 18px;
        text-decoration:none;border-radius:5px;display:inline-block;">
        Follow on LinkedIn
      </a>

    </div>

    <p>If your inquiry is urgent, feel free to reply to this email.</p>

    <p style="margin-top:30px;">
      Regards,<br>
      <strong>Aadhyaraj Technologies Team</strong>
    </p>
  `;

  return baseTemplate(content);
};