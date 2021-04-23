
import Ajv from 'ajv'


const ajv = new Ajv({
    coerceTypes: true,
    removeAdditional: true,
    useDefaults: true,
})

// schema/queryLimitOffset
const schema = {
    type: 'object',
    properties: {
        limit: {
            type: 'integer',
            default: 25,
            minimum: 1,
        },
        offset: {
            type: 'integer',
            default: 0,
            minimum: 0,
            maximum: 50,
        }
    },
    required: ['limit'],
    additionalProperties: false
}

ajv.addSchema(schema, 'queryLimitOffset')



function queryLimitOffset(req, res, next) {
	const validate = ajv.getSchema('queryLimitOffset')

	if (validate(req.query)) {
		next()
		return
	}

	res.status(400).send(validate.errors)
}


export {
	queryLimitOffset,
}
