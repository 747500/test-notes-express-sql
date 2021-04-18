
import { Note } from '../../model/index.mjs'


function remove (req, res) {

	Note.destroy({
		where: {
			id: req.params.id,
			UserId: req.UserId,
		}
	})
	.then(result => {

		console.log(result)

		if (1 !== result) {
			res.status(404).send('Not Found')
			return
		}

		res.status(200).send('Ok')
	})
	.catch(err => {
		console.error(err)
		res.status(500).send('Error on the server.')
	})
}

export {
	remove
}
