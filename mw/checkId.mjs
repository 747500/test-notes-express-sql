
import ObjectId from 'bson-objectid'

function checkId (req, res, next) {

	try {
		ObjectId(req.params.id)
	}
	catch (err) {
		res.status(400).send('Bad Id')
		return
	}

	next()
}

export {
	checkId
}
