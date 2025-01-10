import nodemailer from 'nodemailer'

const sendEmailToCompany = async (option: {
  subject: string,
  text: string
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'harshal.madgulkar725@gmail.com',
        pass: 'hhsl qnuq rnog vftr'
      }
    });
  
    const mailOptions = {
      from: "harshal.madgulkar725@gmail.com",
      to: "pegasusintime@gmail.com",
      subject: option.subject,
      text: option.text
    };
  
    transporter.sendMail(mailOptions, 
      // (error, info) => {
      //   if (error) {
      //     console.log("Some Error")
      //   } else {
      //     console.log("Success")
      //   }
      // }
    );
  } catch (error) {
    console.log("Some Error in Email")
  }
};

export default sendEmailToCompany;
