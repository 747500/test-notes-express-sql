

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../../model/index.mjs'


function login(req, res) {

	User.findOne({ where: { email: req.body.email } })
	.then(user => {
		if (null == user) {
			res.status(404).send('No user found.')
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
				expiresIn: 86400 // expires in 24 hours
			}
		)

		res.status(200).send({ auth: true, token: token });
	})
	.catch(err => {
		console.error(err)
		res.status(500).send('Error on the server.')
	})

}

export {
	login,
}
