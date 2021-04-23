
import { Note } from '../../model/index.mjs'


function list (req, res, next) {

	Note.findAll(
		{
			offset: req.query.offset,
			limit: req.query.limit,
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
