
import { Note } from '../../model/index.mjs'


function read (req, res, next) {

	Note.findOne({
		attributes: [ 'content', 'createdAt', 'updatedAt' ],
		where: {
			id: req.params.id,
			UserId: req.UserId
		}
	})
	.then(note => {
		if (null == note) { // ==
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
	.catch(next)
}


export {
	read
}
