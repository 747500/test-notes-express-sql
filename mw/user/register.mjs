
import ObjectId from 'bson-objectid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sequelize from 'sequelize'

import { User } from '../../model/index.mjs'


function register (req, res) {

	const hashedPassword = bcrypt.hashSync(req.body.password, 8);
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
				expiresIn: process.env.JWT_EXPIRES
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
	.catch(err => {
		if (err instanceof sequelize.ValidationError) {
			res.status(400).send(err.errors.map(err => {
				return {
					message: err.message,
					path: err.path
				}
			}))
			return
		}

		console.error(err)
		res.status(500).send("Can't register a user")
	})

}


export {
	register
}
