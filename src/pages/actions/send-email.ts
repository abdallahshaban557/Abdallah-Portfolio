import type { APIRoute } from "astro";
import { sendEmail } from "../../utils/email";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // Get the form data submitted by the user on the home page
  const formData = await request.formData();
  const from = formData.get("from") as string | null;
  const subject = formData.get("subject") as string | null;
  const message = formData.get("message") as string | null;

  // Throw an error if we're missing any of the needed fields.
  if (!from || !subject || !message) {
    throw new Error("Missing required fields");
  }

  // Try to send the email using a `sendEmail` function we'll create next. Throw
  // an error if it fails.
  try {
    console.log('Sending email...');
    console.log(import.meta.env.RESEND_API_KEY);
    const html = `<div>${message}</div>`;
    await sendEmail({ from, subject, html });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};