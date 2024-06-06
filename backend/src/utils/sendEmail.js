const nodemailer = require('nodemailer');
const { configObject } = require('../config/config');
const { text } = require('express');

const transport = nodemailer.createTransport({
  secure: true,
  service: 'gmail',
  port: 587,
  auth: {
    user: configObject.gmail_user_app,
    pass: 'boja yrjt wpee psbz',
  },
});

async function sendEmail(to, subject, html) {
  try {
    await transport.sendMail({
      from: '<vehicles.ticket@gmail.com>',
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    console.log(error);
  }
}

module.exports = {
  sendEmail,
};
