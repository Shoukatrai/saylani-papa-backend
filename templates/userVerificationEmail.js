export const userVerificationEmail = (otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f7fa; font-family:'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fa; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" style="background-color:#ffffff; border-radius:10px; padding:40px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td align="center">
              <h1 style="font-family: 'Segoe UI', sans-serif; font-size: 28px; margin: 0; padding: 0;">
  <span style="color: #28a745;">Saylani</span>
  <span style="color: #007bff;">Papa</span>
</h1>

              <h2 style="margin-top: 0; font-weight: 500;">Verify Your Email Address</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 0; text-align: center;">
              <p style="font-size:16px; color:#444;">Thank you for signing up with <strong>Saylani PAPA</strong>! To complete your registration, please use the following OTP:</p>
              <div style="margin: 20px auto; background-color:#e8f0fe; color:#1976d2; font-size:30px; font-weight:bold; padding:15px 30px; display:inline-block; border-radius:8px; letter-spacing:5px;">
                ${otp}
              </div>
              <p style="font-size:14px; color:#777;">This OTP is valid for 10 minutes.</p>
            </td>
          </tr>
          <tr>
            <td style="text-align:center; padding-top:20px;">
            <a href="http://localhost:5173/user-verification">Enter OTP For Verification!</a>
              <p style="font-size:14px; color:#888;">If you didn’t sign up for Saylani PAPA, you can safely ignore this email.</p>
              <hr style="margin: 30px 0; border: none; height: 1px; background-color: #eee;" />
              <p style="font-size:12px; color:#bbb;">&copy; 2025 Saylani PAPA. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

  `;
};
