import { createTransport, type Transporter } from "nodemailer";

type SendEmailOptions = {
  /** Email address of the sender */
  from: string;
  /** Subject line of the email */
  subject: string;
  /** Message used for the body of the email */
  html: string;
};

export async function sendEmail(options: SendEmailOptions): Promise<Transporter> {
  const transporter = await getEmailTransporter();
  return new Promise(async (resolve, reject) => {
    // Build the email message
    const { from, subject, html } = options;
    const sendingEmail = import.meta.env.SEND_EMAIL_FROM;
    const message = { 
      to: 'abdallah.w.shaban@gmail.com', 
      subject, 
      html, 
      from: sendingEmail,
      replyTo: from // Add the "from" email as the reply-to address
    };
    // Send the email
    transporter.sendMail(message, (err, info) => {
      // Log the error if one occurred
      if (err) {
        console.error(err);
        reject(err);
      }
      // Log the message ID and preview URL if available.
      console.log("Message sent:", info.messageId);
      resolve(info);
    });
  });
}

async function getEmailTransporter(): Promise<Transporter> {
  return new Promise((resolve, reject) => {
    if (!import.meta.env.RESEND_API_KEY) {
      throw new Error("Missing Resend configuration");
    }
    const transporter = createTransport({
      host: "smtp.resend.com",
      secure: true,
      port: 465,
      auth: { user: "resend", pass: import.meta.env.RESEND_API_KEY },
    });
    resolve(transporter);
  });
}