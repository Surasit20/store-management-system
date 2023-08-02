const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:"email",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'wesringoki@gmail.com',
      pass: 'tpavokmijarbabmv'
    }
  });

  const sendEmail = await transporter.sendMail({
    from: 'wesringoki@gmail.com', // sender address
    to: "mythgamer2557@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  