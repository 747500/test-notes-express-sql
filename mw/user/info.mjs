
import { User } from '../../model/index.mjs'

function info (req, res, next) {

		User.findByPk(req.UserId)
		.then(user => {
			if (null == user) {
				res.status(404).send("Not Found")
				return
			}

			const { id, password, ...result } = user.toJSON()
			res.status(200).send(result)
		})
		.catch(next)

	}

export {
	info
}
