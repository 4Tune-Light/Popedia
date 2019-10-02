require('dotenv/config')
var nodemailer = require('nodemailer');
const app = require('../app')

const mailer = (name, email, token) => {
	
	app.client.setex(email, 1800, token)

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
		<h1>Atur Ulang Kata Sandi Popedia</h1>
		<h4>Hai, ${name}</h4>
		<p>Kami menerima permohonan atur ulang kata sandi Popedia Anda.
		 Untuk menyelesaikan proses penggantian kata sandi, mohon menggunakan tombol
		  di bawah ini:</p>

		<div style="text-align: center;">
			<a href="http://ec2-54-204-153-133.compute-1.amazonaws.com:4869/api/users/reset/${token}" style="color: white">
				<button style="background-color: #42B549; padding: 10px; border: none; border-radius: 3px; color: white">Ganti Kata Sandi di Popedia</button>
			</a>
		</div>

		<p>Jika Anda tidak mengajukan permohonan untuk mengatur ulang kata sandi Anda di 
				Popedia, Anda bisa abaikan saja email ini.</p>
	</div>
	`

	const mailOptions = {
	  from: process.env.ADM_EMAIL,
	  to: email,
	  subject: 'Forget Password',
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