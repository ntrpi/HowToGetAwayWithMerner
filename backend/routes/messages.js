// const helper = require( './routeHelper' );
// var router = require( 'express' ).Router();

// let Message = require( '../models/messages.model' );
// let User = require( '../models/user.model' );

// app.post('/send', (req, res, next) => {
//   var name = req.body.name
//   var email = req.body.email
//   var subject = req.body.subject
//   var message = req.body.message

//   var mail = {
//     from: name,
//     to: '',// receiver email,
//     subject: subject,
//     text: message
//   }

//   transporter.sendMail(mail, (err, data) => {
//     if (err) {
//       res.json({
//         status: 'failed to send mail router issue'
//       })
//     } else {
//       res.json({
//        status: 'success'
//       })
//     }
//   })
// })
