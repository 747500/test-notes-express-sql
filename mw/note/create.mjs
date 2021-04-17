
import ObjectId from 'bson-objectid'

import { Note } from '../../model/index.mjs'


function create(req, res) {
	const id = ObjectId().toString()

	Note.create({
		id,
		UserId: req.UserId,
		content: req.body
	})
	.then(result => {
		res.status(200).send({ id })
	})
	.catch(err => {
		console.error(err)
		res.status(500).send('Error on the server.')
	})
}


export {
	create
}
