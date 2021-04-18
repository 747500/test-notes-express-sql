
import validator from 'validator'


export function isNotEmpty (value) {
	if (validator.isEmpty(value)) {
		throw new Error('Empty value')
	}
}
