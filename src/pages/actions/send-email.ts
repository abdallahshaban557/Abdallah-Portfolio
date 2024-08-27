import type { APIRoute } from "astro";
import { sendEmail } from "../../utils/email";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get the form data submitted by the user on the home page
    const formData = await request.formData();
    const from = formData.get("from") as string | null;
    const subject = formData.get("subject") as string | null;
    const message = formData.get("message") as string | null;

    // Check if we're missing any of the needed fields.
    if (!from || !subject || !message) {
      return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Try to send the email
    const html = `<div>${message}</div>`;
    await sendEmail({ from, subject, html });
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Log the error and return a more detailed error response
    console.error('Error in send-email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};