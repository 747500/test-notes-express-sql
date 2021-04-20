

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../../model/index.mjs'


function login(req, res, next) {

	User.findOne({ where: { email: req.body.email } })
	.then(user => {
		if (null == user) {
			res.status(401).send({
				auth: false,
				token: null
			})
			return
		}

		const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
		if (!passwordIsValid) {
			res.status(401).send({ auth: false, token: null })
			return
		}

		const token = jwt.sign(
			{ id: user.id },
			process.env.JWT_SECRET,
			{
				expiresIn: parseInt(process.env.JWT_EXPIRES, 10)
			}
		)

		res.status(200).send({
			auth: true,
			token
		})
	})
	.catch(next)

}

export {
	login,
}
