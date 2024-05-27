const express = require('express');
const { createTransport } = require('nodemailer')
const email = express.Router()

const transport = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'meagan.okuneva@ethereal.email',
        pass: '2QrcJyARu6qenNSgF4'
    }
})

email.post('/email',  async (req, res) => {
    const {email, recipient, subject, text} = req.body

    console.log(req.body.email);
    const mailOptions = {
        from: 'Epicode',
        to: 'marcodevincentiis71@gmail.com',
        subject: subject,
        text: text
    }

    await transport.sendMail( mailOptions , (error, info)=>{
        if (error) {
            return res.status(400).send('error during email sending' + error)
        } else {
            res.status(200).send('email sent')
        }
    })

})

module.exports = email