
import isValidUTF8 from 'utf-8-validate'

function checkBody (req, res, next) {

	if (!isValidUTF8(req.body)) {
		res.status(400).send('Bad utf8 in body')
		return
	}

	next()
}

export {
	checkBody,
}
