var express = require("express");
var app = express();
var postmark = require("postmark");
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
app.use(cors());

app.post("/contact", async function (req, res) {
  const body = req.body;

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: process.env.EMAIL_TO, // Change to your recipient
    from: process.env.EMAIL_FROM, // Change to your verified sender
    subject: "Porfolio Contact Form",
    html: `
  <h1>Portfolio Contact Form</h1>
  <p><strong>Name:</strong> ${body.person_name}</p>
  <p><strong>Name:</strong> ${body.email}</p>
  <p><strong>Company:</strong> ${body.company}</p>
  <p><strong>Message:</strong> ${body.message}</p>
`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
