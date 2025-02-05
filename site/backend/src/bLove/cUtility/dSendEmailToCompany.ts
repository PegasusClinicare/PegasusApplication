import nodemailer from 'nodemailer'

const sendEmailToCompany = async (option: {
  subject: string,
  text: string
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'info.intimealerts@gmail.com',
        pass: 'mtcn xvni cayz yqmv'
      }
    });
  
    const mailOptions = {
      from: "info.intimealerts@gmail.com",
      to: "info.intimealerts@gmail.com",
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
