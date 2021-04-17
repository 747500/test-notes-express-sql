
import ObjectId from 'bson-objectid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


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
				expiresIn: 86400 // expires in 24 hours
			}
		)
	})
	.then(token => {
		res.status(200).send(
			{
				auth: true,
				token: token
			}
		)
	})
	.catch(err => {
		console.error(err)
		res.status(500).send("There was a problem registering the user.")
	})

}


export {
	register
}
