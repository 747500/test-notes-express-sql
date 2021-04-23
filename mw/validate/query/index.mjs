
import ajv from '../ajv.mjs'


const schema = {
	"$id": "validate.query.LimitOffset",
    "type": "object",
    "properties": {
        "limit": {
            "type": "integer",
            "default": 25,
            "minimum": 1,
        },
        "offset": {
            "type": "integer",
            "default": 0,
            "minimum": 0,
            "maximum": 50,
        }
    },
	"anyOf": [ // not needed because of "useDefaults: true"
		{ "required": [ "limit", "offset" ] },
		{
			"not": { "anyOf": [
	    		{ "required": [ "limit" ] },
	    		{ "required": [ "offset" ] },
			] }
		}
	],
    "additionalProperties": false
}

ajv.addSchema(schema)


function LimitOffset(req, res, next) {
	const validate = ajv.getSchema('validate.query.LimitOffset')

	if (validate(req.query)) {
		next()
		return
	}

	res.status(400).send(validate.errors)
}


export {
	LimitOffset,
}
