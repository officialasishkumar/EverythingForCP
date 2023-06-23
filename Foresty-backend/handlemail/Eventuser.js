const nodemailer = require("nodemailer");
require("dotenv").config();

const Eventuser = (
  eventname,
  eventdate,
  username,
  eventtime,
  useremail,
  link
) => {
  const sub = "Welcome to EverythingForCP!";
  const tex = `Dear ${username},

We are delighted to have you as a registered participant for our upcoming event ${eventname} on ${eventdate}  , ${eventtime} (24hr IST) . On behalf of the entire CFlovers team, I extend a warm welcome to you!

We have also planned several surprises and exciting activities throughout the event to make your time with us truly memorable.

If you have any specific questions or require assistance, don't hesitate to reach out to our dedicated support team at cfloversaa@gmail.com

Once again, welcome to EverythingForCp! We can't wait to see you at the event and share this remarkable experience together.

Best regards,

Here is meet link : ${link}

Admin
EverythingForCp`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mail,
      pass: process.env.pass,
    },
  });

  const mailOptions = {
    from: process.env.mail,
    to: useremail,
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

module.exports = Eventuser;
