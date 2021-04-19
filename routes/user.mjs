
import express from 'express'
import bodyParser from 'body-parser'

import * as mw from '../mw/index.mjs'


const user = express.Router()

user.use(bodyParser.json())

user.post('/register',
	mw.user.register,
	mw.error.validation
)

user.post('/login',
	mw.user.login,
	mw.error.validation
)

user.get('/info',
	mw.user.verify,
	mw.user.info
)


export {
	user,
}
