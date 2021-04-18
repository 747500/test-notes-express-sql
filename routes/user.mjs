
import express from 'express'
import bodyParser from 'body-parser'

import * as mw from '../mw/index.mjs'


const user = express.Router()

user.use(bodyParser.json())

user.post('/register',
	mw.user.register
)

user.post('/login',
	mw.user.login
)

user.get('/info',
	mw.user.verify,
	mw.user.info
)


export {
	user,
}
