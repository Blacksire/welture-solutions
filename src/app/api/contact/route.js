"use cleint";
import { NextResponse } from "next/server";
import mail from "@sendgrid/mail";

// Set the SendGrid API key
mail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function POST(req) {
  try {
    // Parse FormData from the request
    const formData = await req.formData();

    // Extract fields from FormData
    const Name = formData.get("Name");
    const companyName = formData.get("companyName");
    const emailAddress = formData.get("emailAddress");
    const phoneNumber = formData.get("phoneNumber");
    const messageText = formData.get("message");

    // Construct the email message
    const message = `
      <p>Inquiry Form</p>
      <p><strong>Name:</strong> ${Name}</p>
      <p><strong>Company Name:</strong> ${companyName}</p>
      <p><strong>Email:</strong> ${emailAddress}</p>
      <p><strong>Contact Number:</strong> ${phoneNumber}</p>
      <p><strong>Message:</strong> ${messageText}</p>
      <br>
      <i>This email was sent from Inquiry Form on <a href="https://www.welturesolutions.com/">Welture Solutions</a></i>
    `;

    const data = {
      to: "enquiries@welturesolution.com",
      from: "noreply@twg2c2p.com",
      subject: "Inquiry Form",
      text: message,
      html: message.replace(/\r\n/g, "<br>"),
    };

    await mail.send(data);

    return NextResponse.json({
      status: "success",
      message: "Your message was sent successfully.",
    });
  } catch (error) {
    console.error(
      "SendGrid Error:",
      error.response ? error.response.body : error
    );

    return NextResponse.json(
      { status: "error", message: `Message failed: ${error.message}` },
      { status: 500 }
    );
  }
}
