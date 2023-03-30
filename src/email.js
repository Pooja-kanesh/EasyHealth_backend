const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'poojakanesh@outlook.com',
        pass: 'qwerty@12345'
    }
});

// send mail with defined transport object
const welcomeEmail = (email, name) => {
    transporter.sendMail({
        from: '"EasyHealth App" <poojakanesh@outlook.com>', // sender address
        to: email, // list of receivers
        subject: "Welcome to EasyHealth", // Subject line
        html: `<h3><b>Welcome ${name}!</b></h3>
        <p>A warm welcome to you and thank you for choosing our healthcare management app to help you manage your health and well-being.
         We understand that staying on top of your health can be challenging, and this app is designed with the goal of making it easier for you to take care of yourself and your family. <br>
         <br> Here is a brief overview of some of the features you can expect:</p>
         <ul>
         <li> Personal Health Records where you can store and access your health information, such as immunizations, and medical history.</li>
         <li> Appointment scheduling and reminders for doctor visits or other healthcare services.</li>
         <li> Vaccination certificates availble to download after getting vaccinated.</li>
         </ul>
         <p>...and much more <br> <br> 
         We hope that you will find our healthcare management app to be a useful tool in your healthcare journey. <br>
         <br> Best regards,<br>
        EasyHealth Team
         </p>`
        // plain text body
    })
}

const bookingEmail = (email, name) => {
    transporter.sendMail({
        from: '"EasyHealth App" <poojakanesh@outlook.com>',
        to: email,
        subject: "Goodbye! from Task-Manager",
        text: `Dear ${name}, \n Your appointment has been booked.`,
        html: `<p>● Center name : <b>${center}</b><br>● Vaccine name : <b>${vaccine}</b><br>● Timing : <b>10:00 am, Tomorrow</b></p>`
    })
}

module.exports = {
    welcomeEmail,
    bookingEmail
}