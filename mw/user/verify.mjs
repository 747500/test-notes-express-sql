
import jwt from 'jsonwebtoken'

function verify (req, res, next) {

	var token = req.headers['x-access-token'];
	if (null == token) {
		res.status(403).send({ auth: false, message: 'No token provided' })
		return
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

		if (err instanceof jwt.TokenExpiredError) {
			res.status(403).send({
				auth: false,
				message: 'Token expired'
			})
			return
		}

		if (err instanceof jwt.JsonWebTokenError) {
			res.status(400).send({
				auth: false,
				message: 'Bad token'
			})
			return
		}

		if (err) {
			console.error(err)
			res.status(500).send({
				auth: false,
				message: 'Failed to authenticate token'
			})
			return
		}

		req.UserId = decoded.id;

		next()
	})
}

export {
	verify,
}
