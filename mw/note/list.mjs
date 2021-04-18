
import { Note } from '../../model/index.mjs'


function list (req, res) {

	Note.findAll(
		{
			offset: 0,
			limit: 5,
			attributes: [ 'id', 'createdAt', 'updatedAt' ],
			where: {
				UserId: req.UserId
			}
		}
	)
	.then(list => {
		list = list.map(note => note.toJSON())
		res.status(200).send(list)
	})
	.catch(err => {
		console.error(err)
		res.status(500).send('Error on the server.')
	})
}

export {
	list
}
