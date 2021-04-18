
import express from 'express'
import bodyParser from 'body-parser'

import * as mw from '../mw/index.mjs'

import { user } from './user.mjs'
import { notes } from './notes.mjs'
import { share } from './share.mjs'


const api = express.Router()

api.use('/user', user)

api.use('/notes', mw.user.verify, notes)

api.use('/share', share)

api.get('/public/:id', mw.checkId, mw.note.shared)


export {
	api
}
