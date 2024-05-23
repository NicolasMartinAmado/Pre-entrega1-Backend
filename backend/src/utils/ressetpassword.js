const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { configObject } = require('../config/config')
const { logger } = require('./logger')

// Configurar el transporte de nodemailer
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    service: 'gmail',
    port: 465,
    auth: {
        user: configObject.gmail_user_app,
        pass: "boja yrjt wpee psbz"
    }
})
console.log(transport)
exports.sendPasswordResetEmail = async (userId, userEmail) => {
   
    const token = jwt.sign({ userId }, 'secret', { expiresIn: '1h' })

  
    const resetUrl = `https://localhost:8080/reset-password?token=${token}`

    // Crear y enviar el correo electrónico
    await transport.sendMail({
        
        from: 'nikiamado123@gmail.com',
        to: userEmail,
        subject: 'Restablecer contraseña',
        html: `
            <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <a href="${resetUrl}">Restablecer contraseña</a>
        `
    })
}

// Función para verificar y decodificar el token JWT
exports.verifyResetToken = (token) => {
    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, 'secret')
        return decoded
    } catch (error) {
        // Manejar errores de token inválido o expirado
        logger.error('Token not found')
        return null
    }
}