
import { User } from '../../model/index.mjs'

function info (req, res) {

		User.findByPk(req.UserId)
		.then(user => {
			if (null == user) {
				res.status(404).send("No user found.")
				return
			}

			const { password, ...result } = user.toJSON()
			res.status(200).send(result)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send("There was a problem finding the user.")
		})

	}

export {
	info
}
