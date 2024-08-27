import type { APIRoute } from "astro";
import { sendEmail } from "../../utils/email";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const from = formData.get("from") as string | null;
    const subject = formData.get("subject") as string | null;
    const message = formData.get("message") as string | null;

    if (!from || !subject || !message) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const html = `<div>${message}</div>`;
    await sendEmail({ from, subject, html });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};