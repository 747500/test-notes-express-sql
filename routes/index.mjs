
import express from 'express'
import bodyParser from 'body-parser'

import * as mw from '../mw/index.mjs'


const api = express.Router()

api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())

api.post('/register', mw.user.register)

api.get('/me', mw.user.verify, mw.user.info)

api.post('/login', mw.user.login)

const notesRouter = express.Router()

notesRouter.use(bodyParser.text({ type: 'text/*', limit: 4096 }))

notesRouter.get('/list', mw.note.list)
notesRouter.put('/', mw.note.create)
notesRouter.get('/:id', mw.note.read)
notesRouter.post('/:id', mw.note.update)
notesRouter.delete('/:id', mw.note.remove)

api.use('/notes', mw.user.verify, notesRouter)

api.get('/shared/:id', (req, res) => res.send('/'))

export {
	api
}
