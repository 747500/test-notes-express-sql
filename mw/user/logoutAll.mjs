
import { jwtexp } from '../../services/index.mjs'

function logoutAll (req, res, next) {

	res.on('finish', () => {
		jwtexp.add(req.jwt)
	})

	res.status(200).send('Ok')

}

export {
	logoutAll
}
