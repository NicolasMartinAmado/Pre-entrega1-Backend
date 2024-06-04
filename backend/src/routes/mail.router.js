const { Router } = require('express');
const { sendMail } = require('../utils/sendEmail');

const router = Router();

const user = {
  email: 'projectodigitalgen@gmail.com',
  first_name: 'Nicolas',
  last_name: 'Amado',
};

router.get('/mail', (req, res) => {
  sendMail(to, subject, html);
  res.send('mail sent');
  console.log('rsfd');
});

module.exports = router;
