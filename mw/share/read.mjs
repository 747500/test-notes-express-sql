
import ObjectId from 'bson-objectid'

import { Note } from '../../model/index.mjs'

function read (req, res) {

	return Note.findOne({
		attributes: [ 'shared' ],
		where: { id: req.params.id },
	})
	.then(note => {
		if (null === note) {
			res.status(404).send('Not Found')
			return
		}

		res.status(200).send({ publicId: note.shared })

	})
	.catch(err => {
		console.error(err)
		res.status(500).send('Server failed to save')
	})

}

export {
	read,
}
