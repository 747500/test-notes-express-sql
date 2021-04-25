
import jwt from 'jsonwebtoken'

import { jwtexp } from '../../services/index.mjs'

function verify (req, res, next) {

	const token = req.headers['x-access-token']

	if (null == token) { // ==
		res.status(403).send({
			auth: false,
			message: 'No token provided'
		})
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
			next(err)
			return
		}

		if (jwtexp.isExpired(decoded)) {
			res.status(400).send({
				auth: false,
				message: 'Token logged out'
			})
			return
		}

		req.jwt = decoded
		req.UserId = decoded.id

		next()

	})
}

export {
	verify,
}
