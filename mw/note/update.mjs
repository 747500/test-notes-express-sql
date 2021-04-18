
import sequelize from 'sequelize'

import { Note } from '../../model/index.mjs'


function update (req, res) {

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
	.catch(err => {
		if (err instanceof sequelize.ValidationError) {
			res.status(400).send(err.errors.map(err => {
				return {
					message: err.message,
					path: err.path
				}
			}))
			return
		}

		console.error(err)
		res.status(500).send('Error on the server.')
	})
}

export {
	update
}
