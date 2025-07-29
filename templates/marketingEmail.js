export const marketingEmail = (name) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Exclusive Offer</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
    }
    .header {
      background-color: #007BFF;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .button {
      display: inline-block;
      background-color: #28a745;
      color: white;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .footer {
      font-size: 12px;
      text-align: center;
      color: #888888;
      padding: 20px;
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        padding: 10px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>🔥 Exclusive Offer Just for You!</h1>
    </div>

    <div class="content">
      <p>Hi ${name},</p>
      <p>We’re excited to bring you this limited-time offer! Shop our latest collection and enjoy up to <strong>50% off</strong> your favorite items.</p>

      <p>Don’t miss out—this deal ends soon!</p>

      <a href="http://localhost:5173/" class="button">Shop Now</a>
    </div>

    <div class="footer">
      <p>You’re receiving this email because you opted in at our website.</p>
      <p><a href="https://your-website.com/unsubscribe">Unsubscribe</a> | SaylaniPapa</p>
    </div>
  </div>
</body>
</html>
`
};
