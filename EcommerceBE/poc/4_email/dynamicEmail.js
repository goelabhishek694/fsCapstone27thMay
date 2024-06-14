// signup-> on signup send email , welcome
// preparation welcome email template -> placeholders for name
// execution -> take that template -> read -> string -> replace -> actual value

const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "vermadeepak626@gmail.com",
    pass: "wxgcuxjwfhkpcvcw",
  },
});

function updateTemplate(htmlString,emailObject){
    let keysArr=Object.keys(emailObject);
    keysArr.forEach((key)=>{
        htmlString=htmlString.replace(`#{${key}}`,emailObject[key])
    });
    return htmlString;
}
let email2
async function emailSender(template, receiverEmail, emailObject) {
  try {
    const templatePath = path.join(__dirname, "templates", template);
    const htmlString = await fs.promises.readFile(templatePath, "utf-8");
    const finalEmailContent = updateTemplate(htmlString, emailObject);
    const msg = {
      from: "Private Email 'vermadeepak626@gmail.com'", // sender address
      to: receiverEmail,
      // list of receivers
      subject: "Sending via Nodemailer", // Subject line
      cc : "sidtomar@outlook.com",
      bcc: "workspace969@gmail.com",
      attachments:[
        {
          filename:"paySlip.png",
          path:'1a.png'
        }
      ],
      text: "Hello world?", // plain text body
      html: finalEmailContent, // html body
    };
    await transporter.sendMail(msg);
  } catch (err) {
    console.log(err);
  }
}

emailSender("signup.html", "goelabhishek694@gmail.com, raushan@clubman.in", { name: "Abhishek" }).then(()=>console.log("email sent"));

module.exports=emailSender;
