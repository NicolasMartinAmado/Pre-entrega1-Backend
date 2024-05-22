const nodemailer = require('nodemailer')
const { configObject } = require('../config/config')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configObject.gmail_user_app,
        pass: configObject.gmail_password_app
    }
})

async function sendEmail(to, subject, html) {
    try {
        await transport.sendMail({
            from: 'Your App Name <nikiamado123@gmail.com>',
            to: `nikiamado123@gmail.com`,
            subject: `de prueba`,
            html: `<div>
            <h2>Bienvenido a prueba de email </h2>
        </div>` 
        
        })
        
        console.log(`Email sent to`)
    } catch (error) {
        console.error(`Error sending email`, error)
        console.log(error)
    }
}

module.exports = {
    sendEmail
}