import { Resend } from "npm:resend";

const resend = new Resend(
  Deno.env.get("RESEND_API_KEY")
);

Deno.serve(async (req) => {
  try {
    const { email, name } = await req.json();

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to TFO One 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
          <h1>Welcome to TFO One 🚀</h1>

          <p>Hi ${name || "there"},</p>

          <p>Thank you for signing up for TFO One.</p>

          <p>
            We're excited to have you onboard and help you grow your business.
          </p>

          <p>
            You can now log in and start exploring the platform.
          </p>

          <hr />

          <p>
            Regards,<br/>
            Team TFO One
          </p>
        </div>
      `,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
});