// Import necessary modules
import Mailgun from "mailgun.js";
import formData from "form-data";

// Initialize Mailgun client
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

// Define the POST handler
export async function POST(request) {
  try {
    // Parse the request body
    const { userData, internalData } = await request.json();

    // Send email to the user
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Hello Drew Team <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: userData.email,
      subject: "We Got Your Info – Give Us 24-48 Hours!",
      text: `Hey ${userData.firstName},\n\nThanks for reaching out! We’re reviewing your info, running some numbers, and making sure everything checks out before we get back to you. Give us 24-48 hours, and we’ll be in touch with the next steps.\n\nIf you have any urgent questions, feel free to reply to this email. Otherwise, sit tight, we’ll talk soon!\n\nCheers,\n\nThe Hello Drew Team`,
    });

    // Send internal email to Eric and Support Team
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Hello Drew Team <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: ["eric@hellodrew.ai", "support@hellodrew.ai"],
      // to: ["gcch1122@gmail.com"],
      subject: `New Custom Team Inquiry – ${userData.firstName}`,
      text: `New Inquiry Submitted\n\nA new Custom Team / Brokerage inquiry has been received. Here are the details:\n\nName: ${userData.firstName}\n\nCompany/Brokerage: ${userData.company}\n\nEmail: ${userData.email}\n\nPhone: ${userData.phone}\n\nTeam Size: ${internalData.teamSize}\n\nPrimary CRM Used: ${internalData.crm}\n\nRequested Features: ${internalData.features}\n\nBudget Range: ${internalData.budget}\n\nAdditional Notes: ${internalData.additionalInfo}\n\nA PDF of the submitted form is attached for reference.\n\nNext Steps:\n\nReview the user's details.\n\nDetermine the best pricing/package for them.\n\nFollow up via email or phone to provide a quote and discuss their needs.\n\nContact the user directly at ${userData.phone} or ${userData.email} for follow-up.\n\nThanks,\n\nHello Drew Support Team`,
    });

    // Return a success response
    return new Response(
      JSON.stringify({ message: "Emails sent successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending emails:", error);

    // Return an error response
    return new Response(JSON.stringify({ message: "Failed to send emails" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
