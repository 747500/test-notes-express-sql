
import express from 'express'
import bodyParser from 'body-parser'

import * as mw from '../mw/index.mjs'


const api = express.Router()


const userRouter = express.Router()
userRouter.use(bodyParser.json())
userRouter.post('/register', mw.user.register)
userRouter.post('/login', mw.user.login)
userRouter.get('/info', mw.user.verify, mw.user.info)
api.use('/user', userRouter)


const notesRouter = express.Router()
notesRouter.use(bodyParser.text({ type: 'text/*', limit: 5000 })) // UTF8/16
notesRouter.get('/list', mw.note.list)
notesRouter.put('/', mw.note.create)
notesRouter.get('/:id', mw.checkId, mw.note.read)
notesRouter.post('/:id', mw.checkId, mw.note.update)
notesRouter.delete('/:id', mw.checkId, mw.note.remove)
api.use('/notes', mw.user.verify, notesRouter)


const sharedRouter = express.Router()
sharedRouter.use(bodyParser.json())
sharedRouter.get('/:id', mw.checkId, mw.share.read)
sharedRouter.patch('/:id', mw.checkId, mw.share.update)
api.use('/shared', sharedRouter)


api.get('/public/:id', mw.checkId, mw.note.shared)


export {
	api
}
