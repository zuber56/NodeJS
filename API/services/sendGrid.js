const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const nodemailer = require("nodemailer");

module.exports.SendEmail = async function (data) {

  let testAccount = await nodemailer.createTestAccount();
  // console.log("testAccount::",testAccount);
  const { email, name, password } = data;
    // console.log("process.evn.NODE_MAILER_USER::>>",process.env.PASS);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zkh.globaliasoft@gmail.com',
      pass: 'D}zhM+4sb('
    }
  });
  var mailOptions = {
    from: 'zkh.globaliasoft@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'Hii sonu'
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  try {
    // console.log("msg:::");
    // await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  };
}

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// module.exports.SendEmail = async function (data) {
//   console.log("data::",data);
//   const { email, name, password } = data;
// console.log("email:::::::",email, name, password);
//   const msg = {
//     from: 'zkh.globaliasoft@gmail.com', // Use the email address or domain you verified above
//     subject: 'demo testing....',
//     text: 'Welcome................',
//     // html: '<strong>You can sign in with it</strong>',
//     template_id: "d-97cfcadeba734652873fb6298644e947",
//     personalizations: [
//       {
//         to: [
//           {
//             email: email
//           }
//         ],
//         dynamic_template_data: {
//           // agency_name: agencyName,
//           name: name,
//           password: password
//         },
//       send_at: 1600188812
//       },
//     ],
//     substitutionWrappers: [':', ''],
//     substitutions: {
//       // agency_name: agencyName,
//       name: name,
//       password: password
//     },
//   };

//   try {
//     // console.log("msg:::",msg);
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   };
// }




// const nodemailer = require("nodemailer");
// const sendgridtransport = require("nodemailer-sendgrid-transport");
// const fs = require("fs");
// const path = require('path');
// module.exports={
//     sendEmail : async (to, subject, content) => {
//         try {
//             const transport = nodemailer.createTransport(
//                 sendgridtransport({
//                     auth: {
//                         api_key:
//                             "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"
//                     }
//                 })
//             );
//             const email = {
//                 from: 'support@seafairmiami.com',
//                 to,
//                 subject:"Seafairmiami Notification",
//                 html: content
//             };
         
//             console.log(email)
// ;
//             await transport.sendMail(email)
// ;
//             return { ok: true, message: "success" };
//         } catch (e) {
//             console.log("email exception:", e.toString());
//             return { ok: false, message: e.toString() };
//         }
//     },
//     sendEmailByPDF: async (to, comment, filepath) => {

//         // var pdfPath = "../../public/upload/WO-873.pdf";
//         // var pdfPath = `${__dirname}/../../public/upload/WO-873.pdf`;
//         // var pdfPath = path.join(__dirname, '../../public/upload/WO-873.pdf');
//         var pdfPath = path.join(__dirname, '../../' + filepath);
//         console.log(pdfPath);       
//         // attachment = fs.readFileSync(pdfPath).toString("base64");
//         try {
//             const transport = nodemailer.createTransport(
//                 sendgridtransport({
//                     auth: {
//                         api_key:
//                             "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"
//                     }
//                 })
//             );
//             const email = {
//                 from: 'support@seafairmiami.com',
//                 to,
//                 subject: "Seafairmiami Notification",
//                 text: comment==''?"It's the purchase order PDF":comment,
//                 attachments: [{
//                     filename: 'purchaseOrder.pdf',
//                     path: pdfPath,
//                     contentType: 'application/pdf'
//                 }],               
//             };

//             // console.log(email)
// ;
//             await transport.sendMail(email)
// ;
//             return { ok: true, message: "success" };
//         } catch (e) {
//             console.log("email exception:", e.toString());
//             return { ok: false, message: e.toString() };
//         }
//     },
// }
