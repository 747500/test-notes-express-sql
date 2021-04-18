
import ObjectId from 'bson-objectid'
import sequelize from 'sequelize'

import { Note } from '../../model/index.mjs'


function create(req, res) {
	const id = ObjectId().toString()

	Note.create({
		id,
		UserId: req.UserId,
		content: req.body.toString()
	})
	.then(result => {
		res.status(200).send({ id })
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
		res.status(500).send('Error on the server.')
	})
}


export {
	create
}
