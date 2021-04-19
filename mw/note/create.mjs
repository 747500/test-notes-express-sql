
import ObjectId from 'bson-objectid'
import sequelize from 'sequelize'

import { Note } from '../../model/index.mjs'


function create(req, res, next) {
	const id = ObjectId().toString()

	Note.create({
		id,
		UserId: req.UserId,
		content: req.body.toString()
	})
	.then(result => {
		res.status(200).send({ id })
	})
	.catch(next)
}


export {
	create
}
