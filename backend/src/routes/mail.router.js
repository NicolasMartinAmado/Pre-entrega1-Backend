const { Router } = require('express')
const { sendMail } = require('../utils/sendEmail')

const router = Router()

const user = {
    email: 'projectodigitalgen@gmail.com',
    first_name: 'Nicolas',
    last_name: 'Amado'
}

router.get('/mail', (req, res) => {
    const to      = user.email
    const subject = 'Esto es un mail de prueba'
    const html    = `<div>
        <h2>Bienvenido a prueba de email ${user.first_name} ${user.last_name}</h2>
    </div>` 
    sendMail(to, subject,html)
    res.send('mail sent')
    console.log("rsfd")
})


module.exports = router