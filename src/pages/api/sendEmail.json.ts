export const prerender = false; //This will not work without this line

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  console.log('sendEmail.json - right at the start of sendingEmail.json');
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message"); // Validate the data - making sure values are not empty

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: `Fill out all fields.`,
      }),
      {
        status: 404,
        statusText: "Did not provide the right data",
      },
    );
  } // Sending information to Resend

  const sendResend = await resend.emails.send({
    from: "contact@abdallahshaban.com",
    to: "abdallah.w.shaban@gmail.com",
    subject: `Sumbission from ${name}`,
    html: `<p>Hi Abdallah,</p><p>Your got a contact from ${name}.</p><p>Message: ${message}</p>`,
  }); // If the message was sent successfully, return a 200 response

  if (sendResend.data) {
    return new Response(
      JSON.stringify({
        message: `Message successfully sent!`,
      }),
      {
        status: 200,
        statusText: "OK",
      },
    ); // If there was an error sending the message, return a 500 response
  } else {
    return new Response(
      JSON.stringify({
        message: `Message failed to send: `,
      }),
      {
        status: 500,
        statusText: `Internal Server Error:`,
      },
    );
  }
};