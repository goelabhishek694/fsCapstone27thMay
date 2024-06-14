const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "vermadeepak626@gmail.com",
    pass: "wxgcuxjwfhkpcvcw",
  },
});

  const msg ={
    from: "vermadeepak626@gmail.com", // sender address
    to: "goelabhishek694@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };


transporter.sendMail(msg).then(()=>{
    console.log("sent email");
}).catch(err=>{
    console.log(err);
})
