
import ObjectId from 'bson-objectid'

import { Note } from '../../model/index.mjs'


function remove (req, res) {
	const id = ObjectId(req.params.id).toString()

	Note.destroy({
		where: {
			id,
			UserId: req.UserId,
		}
	})
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
	remove
}
