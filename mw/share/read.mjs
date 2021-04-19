
import { Note } from '../../model/index.mjs'

function read (req, res, next) {

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
	.catch(next)

}

export {
	read,
}
