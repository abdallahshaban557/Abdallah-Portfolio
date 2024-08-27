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
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const { from, subject, html } = options;
  const sendingEmail = import.meta.env.SEND_EMAIL_FROM;

  try {
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
    console.error('Error sending email:', error);
    throw error;
  }
}