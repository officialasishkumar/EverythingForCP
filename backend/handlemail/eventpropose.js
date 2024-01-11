const nodemailer = require("nodemailer");
require("dotenv").config();

const eventpropose = (emailtosend, username) => {
  const sub = "Thank You for Registering on EverythingForCP";
  const tex = `Dear ${username},

  Thank you for choosing EverythingForCP as your platform for registering for the upcoming event. We appreciate your trust and are excited to have you on board!

At our place , we strive to provide a seamless experience for all our users, and your registration is an important step towards that. Our team is committed to ensuring the quality and credibility of each participant, which is why we will be conducting a thorough review of your registration details.

Please note that the review process may take up to 24 hours to complete. We kindly request your patience during this time as our team carefully verifies the information provided. Rest assured, we are working diligently to expedite the process and will notify you promptly once your registration is verified.

In the meantime, we encourage you to explore our website and familiarize yourself with the event details, agenda, and any additional resources we have made available. Should you have any questions or need assistance, feel free to reach out to our dedicated support team at cfloversaa@gmail.com.


We sincerely appreciate your participation and look forward to welcoming you to the event. Stay tuned for our confirmation email within the next 24 hours.

Thank you again for choosing EverythingForCP!

Best regards,

Admin
EverythungForCp

`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mail,
      pass: process.env.pass,
    },
  });

  const mailOptions = {
    from: process.env.mail,
    to: emailtosend,
    subject: sub,
    text: tex,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = eventpropose;
