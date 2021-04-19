
import { Note } from '../../model/index.mjs'


function list (req, res, next) {

	Note.findAll(
		{
			offset: 0,
			limit: 5,
			attributes: [ 'id', 'createdAt', 'updatedAt', 'shared' ],
			where: {
				UserId: req.UserId
			}
		}
	)
	.then(list => {
		list = list.map(note => note.toJSON())
		res.status(200).send(list)
	})
	.catch(next)
}

export {
	list
}
