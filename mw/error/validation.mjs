
import sequelize from 'sequelize'


export function validation (err, req, res, next) {

	if (err instanceof sequelize.ValidationError) {
		res.status(400).send(err.errors.map(err => {
			return {
				message: err.message,
				path: err.path
			}
		}))
		return
	}

	next(err)
}
