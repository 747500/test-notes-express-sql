
import express from 'express'
import bodyParser from 'body-parser'

import * as mw from '../mw/index.mjs'


const notes = express.Router()

notes.use(bodyParser.raw({ type: 'text/*', limit: 5000 })) // UTF8

notes.get('/list',
	mw.note.list
)

notes.put('/',
	mw.checkBody,
	mw.note.create
)

notes.get('/:id',
	mw.checkId,
	mw.note.read
)

notes.post('/:id',
	mw.checkId,
	mw.checkBody,
	mw.note.update
)

notes.delete('/:id',
	mw.checkId,
	mw.note.remove
)


export {
	notes,
}
