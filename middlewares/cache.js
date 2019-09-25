const redis = require('../app')

const cache = (req, res, next) => {
	redis.client.get('products', (err, data) => {
		if (err) next(err)

		if (data) {
			res.json({
				status: 200,
				error: false,
				data
			})
		} else {
			next()
		}
	})
}

module.exports = cache