
import ObjectId from 'bson-objectid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sequelize from 'sequelize'

import { User } from '../../model/index.mjs'


function register (req, res, next) {

	const hashedPassword = bcrypt.hashSync(req.body.password, 8)
	const id = ObjectId().toString()

	User.create({
		id,
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	})
	.then(user => {
		return jwt.sign(
			{ id },
			process.env.JWT_SECRET,
			{
				expiresIn: parseInt(process.env.JWT_EXPIRES, 10)
			}
		)
	})
	.then(token => {
		res.status(200).send(
			{
				auth: true,
				token
			}
		)
	})
	.catch(next)

}


export {
	register
}
