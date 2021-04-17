
import './env.mjs'


//import sqlite3 from 'sqlite3'
import express from 'express'
import bodyParser from 'body-parser'
//import session from 'express-session'
//import sqliteStoreFactory from 'express-session-sqlite'
import ObjectId from 'bson-objectid'
import morgan from 'morgan'
import cors from 'cors'

import * as mw from './mw/index.mjs'

//const SqliteStore = sqliteStoreFactory.default(session)
const app = express()
const port = process.env.HTTP_PORT

app.use(morgan('dev'))
app.use(cors())
/*
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.HTTP_SESSION_SECRET,
	cookie: { maxAge: 60000 },
    store: new SqliteStore({
		driver: sqlite3.Database,
		// path: ':memory:'
		path: './tmp/sqlite.db',
		// Session TTL in milliseconds
		ttl: 60 * 60 * 24 * 7,
		//prefix: 'sess:',
		// Default is 5 minutes.
		cleanupInterval: 300000,
    })
}))
*/

const hello = (req, res) => {
	res.send('Hello World!')
}

app.get('/', hello)

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/register',
	mw.user.register
)

router.get('/me',
	mw.user.verify,
	mw.user.info
)

router.post('/login',
	mw.user.login
)

const notesRouter = express.Router()

notesRouter.use(bodyParser.text())

notesRouter.get('/list', mw.note.list)
notesRouter.put('/', mw.note.create)
notesRouter.get('/:id', mw.note.read)
notesRouter.post('/:id', mw.note.update)
notesRouter.delete('/:id', mw.note.remove)

router.use('/notes', mw.user.verify, notesRouter)

router.get('/shared/:id', hello)

app.use('/api/v0', router)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
