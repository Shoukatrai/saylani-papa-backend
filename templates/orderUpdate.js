export const orderUpdateTemp= (orderStatus , order)=>{
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Order Status Update - Saylani Papa</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f6f6f6;
        margin: 0;
        padding: 0;
      }
      .email-wrapper {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
      }
      .header {
        background-color: #0f4c81;
        color: white;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .status-box {
        padding: 20px;
        background-color: #f2faff;
        text-align: center;
      }
      .status-box h2 {
        color: #0f4c81;
        margin: 0;
        font-size: 22px;
      }
      .content {
        padding: 20px;
      }
      .content p {
        font-size: 16px;
        color: #444;
        line-height: 1.5;
      }
      .order-details {
        background: #f9f9f9;
        padding: 15px;
        border-radius: 8px;
        margin-top: 10px;
      }
      .order-details table {
        width: 100%;
        border-collapse: collapse;
      }
      .order-details th, .order-details td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      .footer {
        background: #f1f1f1;
        text-align: center;
        padding: 15px;
        font-size: 13px;
        color: #999;
      }
      .btn {
        display: inline-block;
        background-color: #28a745;
        color: white;
        padding: 12px 20px;
        margin-top: 15px;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="header">
        <h1>Saylani Papa</h1>
        <p>Your favorite food is on its way!</p>
      </div>

      <div class="status-box">
        <h2>Order Status: <span style="color: #28a745;"> ${orderStatus} </span></h2>
      </div>

      <div class="content">
        <p>Hi Ali,</p>
        <p>We're excited to let you know that your order <strong>#SP-2048</strong> is now ${orderStatus}.</p>

        <div class="order-details">
          <table>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
            <tr>
              <td>${order.menuName}</td>
              <td> ${order.quantity} </td>
            </tr>
          </table>
        </div>

        <p>You can track your order by clicking the button below:</p>
        <a href="" class="btn">Track Your Order</a>
      </div>

      <div class="footer">
        &copy; 2025 Saylani Papa | This is an automated update. Please don’t reply.
      </div>
    </div>
  </body>
</html>
`
}