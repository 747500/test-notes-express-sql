
import Ajv from 'ajv'


const ajv = new Ajv({
    coerceTypes: true,
    removeAdditional: true,
    useDefaults: true,
})

export default ajv
