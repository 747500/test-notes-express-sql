
import { Note } from '../../model/index.mjs'


function list (req, res, next) {
/*
	const limit = parseInt(req.query.limit, 10) || 20
	const offset = parseInt(req.query.offset, 10) || 0

	if (50 < limit) {
		limit = 50
	}
*/
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
