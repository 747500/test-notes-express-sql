
import validator from 'validator'


export function isMongoId (value) {
	if (!validator.isMongoId(value)) {
		throw new Error('Invalid Id')
	}
}
