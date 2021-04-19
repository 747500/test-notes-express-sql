
import validator from 'validator'


export function isEmail (value) {
	if (!validator.isEmail(value)) {
		throw new Error('Invalid email')
	}
}
