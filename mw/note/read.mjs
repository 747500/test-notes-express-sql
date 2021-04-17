
import ObjectId from 'bson-objectid'

import { Note } from '../../model/index.mjs'


function read (req, res) {

	const id = ObjectId(req.params.id).toString()

	Note.findOne({
		attributes: [ 'content', 'createdAt', 'updatedAt' ],
		where: {
			id,
			UserId: req.UserId
		}
	})
	.then(note => {
		if (null == note) {
			res.status(404).send('Not Found')
			return
		}

		const lastModified = new Date(note.updatedAt)
		const created = new Date(note.createdAt)

		res.set({
			'Last-Modified': lastModified.toUTCString(),
			'Date': created.toUTCString(),
		})

		res.status(200).send(note.content)
	})
	.catch(err => {
		console.error(err)
		res.status(500).send('Error on the server.')
	})
}


export {
	read
}
