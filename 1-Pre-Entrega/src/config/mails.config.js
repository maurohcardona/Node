import nodemailer from "nodemailer";
import config from "./config.js";

const transporter = nodemailer.createTransport({
  service: config.email.relay,
  port: config.email.port,
  auth: {
    user: config.email.userMail,
    pass: config.email.userpass,
  },
});

export default transporter;
