import { Resend } from 'resend';

type SendEmailOptions = {
  /** Email address of the sender */
  from: string;
  /** Subject line of the email */
  subject: string;
  /** Message used for the body of the email */
  html: string;
};

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  console.log("inside email.ts");
  const resend = new Resend(RESEND_API_KEY);
  const { from, subject, html } = options;
  const sendingEmail = SEND_EMAIL_FROM;

  try {
    console.log('Sending email...');
    const { data, error } = await resend.emails.send({
      from: sendingEmail,
      to: 'abdallah.w.shaban@gmail.com',
      subject: subject,
      html: html,
      replyTo: from
    });

    if (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }

    console.log('Email sent successfully:', data);
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
}