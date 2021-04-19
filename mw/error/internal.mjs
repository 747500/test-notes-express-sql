


export function internal (err, req, res, next) {

	console.error(err)

	res.status(500).send({
		error: true,
		message: 'Internal server error'
	})

}
