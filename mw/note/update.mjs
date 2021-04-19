
import sequelize from 'sequelize'

import { Note } from '../../model/index.mjs'


function update (req, res, next) {

	Note.update(
		{
			content: req.body.toString(),
		},
		{
			where: {
				id: req.params.id,
				UserId: req.UserId,
			}
		}
	)
	.then(result => {
		if (1 !== result[0]) {
			res.status(404).send('Not Found')
			return
		}

		res.status(200).send('Ok')
	})
	.catch(next)
}

export {
	update
}
