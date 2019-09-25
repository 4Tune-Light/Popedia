const redis = require('../app')

const cache = (req, res, next) => {
	redis.client.get('products', (err, data) => {
		if (err) next(err)

		if (data !== null) {
			console.log('bisa mah')
			res.json({
				status: 200,
				error: false,
				data: JSON.parse(data)
			})
		} else {
			console.log('gagal')
			next()
		}
	})
}

module.exports = cache