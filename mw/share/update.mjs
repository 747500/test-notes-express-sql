
import { Note } from '../../model/index.mjs'

function update (req, res) {

	const status = req.body.enabled

	if ('boolean' !== typeof status) {
		res.status(400).send('Bad args')
		return
	}

	return Note.findOne({
		attributes: [ 'id', 'shared' ],
		where: { id: req.params.id },
	})
	.then(note => {
		if (null === note) {
			res.status(404).send('Not Found')
			return
		}

		if (true === status && null == note.shared) {
			note.shared = ObjectId().toString()
		}

		if (false === status && null != note.shared) {
			note.shared = null
		}

		return note.save().then(() => {
			res.status(200).send({ publicId: note.shared })
		})
	})
	.catch(err => {
		console.error(err)
		res.status(500).send('Failed to save')
	})
}

export {
	update,
}
