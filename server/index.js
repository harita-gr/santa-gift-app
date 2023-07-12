const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
require("dotenv").config();
const isAgeBelow10Years = require("../util.js");

const PORT = process.env.PORT || 3001;

//Setup for sending emails
let pendingRequests = [];

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

//Server setup
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// For Logs
app.use(morgan());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/success", function (req, res) {
  res.sendFile(__dirname, "../client/build", "success.html");
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Handle the form submission
app.post("/submit", async (req, res) => {
  const formData = req.body; // Get the form data from the request body

  try {
    // Fetch user data using axios
    const userResponse = await axios.get(
      "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json"
    );
    const userData = userResponse.data;

    // Check if the user is registered
    const registeredUser = userData.find(
      (user) => user.username === formData.userName
    );

    if (!registeredUser) {
      return res.status(400).send("Child is not registered.");
    }

    // Fetch profile data using axios
    const profileResponse = await axios.get(
      "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json"
    );
    const profileData = profileResponse.data;

    // Check if the profile is existing
    const userProfile = profileData.find(
      (user) => user.userUid === registeredUser.uid
    );

    if (!userProfile) {
      return res.status(400).send("User Profile not found!");
    }

    //Validation - Check if user age > 10
    const isAgeValid = isAgeBelow10Years(userProfile.birthdate);
    if (!isAgeValid) {
      return res.status(400).send("The child is not below 10 years old!");
    }

    pendingRequests.push({
      userName: formData.userName,
      address: userProfile.address,
      wish: formData.wish,
    });

    // Send a success page back to the client
    res.status(200).send("Successfully received the wish!");
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});

// Schedule the task to run every 15 seconds
cron.schedule("*/15 * * * * *", async () => {
  if (pendingRequests.length > 0) {
    try {
      // Compose the email body
      let emailBody = "";
      pendingRequests.forEach((request) => {
        emailBody += `Child Username: ${request.userName}\n`;
        emailBody += `Child's Address: ${request.address}\n`;
        emailBody += `Request: ${request.wish}\n\n`;
      });

      pendingRequests = [];

      // Compose the email message
      const emailMessage = {
        from: "do_not_reply@northpole.com",
        to: "santa@northpole.com",
        subject: "Pending Requests",
        text: emailBody,
      };

      // Send the email
      const info = await transporter.sendMail(emailMessage);
      console.log("Email sent:", info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
