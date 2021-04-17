
import ObjectId from 'bson-objectid'

export function isObjectId (value) {
	const id = ObjectId(value).toString()
	return id === value
}
