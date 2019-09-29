require('dotenv/config')
var nodemailer = require('nodemailer');
const app = require('../app')

const mailer = (email, otp) => {
	
	app.client.setex(email, 1800, otp)

	const transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: process.env.ADM_EMAIL,
	    pass: process.env.ADM_PW
	  }
	});

	let html = 
	`
	<div>
		<h1>Aktivasi Akun Popedia</h1>
		<h4>Hai, <b>Poppers!</b></h4>
		<p>Masukkan kode berikut untuk melakukan aktivasi akun Popedia</p>

		<div><h2>${otp}</h2></div>
		<h4>Catatan: </h4>
		<p>Kode di atas hanya berlaku selama 30 menit. Harap tidak menyebarkan
			 kode kepada siapapun demi menjaga keamanan akun.</p>
	</div>
	`

	const mailOptions = {
	  from: process.env.ADM_EMAIL,
	  to: email,
	  subject: 'Kode Verifikasi',
	  html
	}

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
}

module.exports = mailer