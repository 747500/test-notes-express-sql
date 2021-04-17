
import ObjectId from 'bson-objectid'

import { Note } from '../../model/index.mjs'


function update (req, res) {
	var id

	try {
		id = ObjectId(req.params.id).toString()
	}
	catch (err) {
		res.status(400).send('Bad Id')
		return
	}

	Note.update(
		{
			content: req.body,
		},
		{
			where: {
				id,
				UserId: req.UserId,
			}
		}
	)
	.then(result => {
		if (1 !== result[0]) {
			res.status(404).send('Not Found')
			return
		}

		res.status(200).send('Ok')
	})
	.catch(err => {
		console.error(err)
		res.status(500).send('Error on the server.')
	})
}

export {
	update
}
