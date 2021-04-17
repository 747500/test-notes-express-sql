
import './env.mjs'


import sqlite3 from 'sqlite3'
import express from 'express'
import bodyParser from 'body-parser'
//import session from 'express-session'
//import sqliteStoreFactory from 'express-session-sqlite'
import ObjectId from 'bson-objectid'
import morgan from 'morgan'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { User, Note } from './model/index.mjs'


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
	(req, res) => {

		const hashedPassword = bcrypt.hashSync(req.body.password, 8);
		const id = ObjectId().toString()

		User.create({
			id,
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		})
		.then(user => {
			return jwt.sign(
				{ id },
				process.env.JWT_SECRET,
				{
					expiresIn: 86400 // expires in 24 hours
				}
			)
		})
		.then(token => {
			res.status(200).send(
				{
					auth: true,
					token: token
				}
			)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send("There was a problem registering the user.")
		})

	}
)

function verifyToken(req, res, next) {
	var token = req.headers['x-access-token'];
	if (null == token) {
		res.status(403).send({ auth: false, message: 'No token provided.' })
		return
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			res.status(500).send({
				auth: false,
				message: 'Failed to authenticate token.'
			})
			return
		}

		console.log('* verifyToken:\n', decoded)

		req.UserId = decoded.id;

		next()
	})
}

router.get('/me',
	verifyToken,
	(req, res) => {

		User.findByPk(req.UserId)
		.then(user => {
			if (null == user) {
				res.status(404).send("No user found.")
				return
			}

			const { password, ...result } = user.toJSON()
			res.status(200).send(result)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send("There was a problem finding the user.")
		})

	}
)

router.post('/login',
	(req, res) => {

		User.findOne({ where: { email: req.body.email } })
		.then(user => {
			if (null == user) {
				res.status(404).send('No user found.')
				return
			}

			const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
			if (!passwordIsValid) {
				res.status(401).send({ auth: false, token: null })
				return
			}

			const token = jwt.sign(
				{ id: user.id },
				process.env.JWT_SECRET,
				{
					expiresIn: 86400 // expires in 24 hours
				}
			)

			res.status(200).send({ auth: true, token: token });
		})
		.catch(err => {
			console.error(err)
			res.status(500).send('Error on the server.')
		})

	}
)

const notesRouter = express.Router()

notesRouter.use(bodyParser.text())

notesRouter.get('/list',
	(req, res) => {
		Note.findAll(
			{
				offset: 0,
				limit: 5,
				attributes: [ 'id', 'createdAt', 'updatedAt' ],
				where: {
					UserId: req.UserId
				}
			}
		)
		.then(list => {
			list = list.map(note => note.toJSON())
			res.status(200).send(list)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send('Error on the server.')
		})
	}
)

notesRouter.get('/:id',
	(req, res) => {

		Note.findOne({
			attributes: [ 'content', 'createdAt', 'updatedAt' ],
			where: {
				id: req.params.id,
				UserId: req.UserId
			}
		})
		.then(note => {
			if (null == note) {
				res.status(404).send('Not Found')
				return
			}

			const lastModified = new Date(note.updatedAt)
			const created = new Date(note.createdAt)

			res.set({
				'Last-Modified': lastModified.toUTCString(),
				'Date': created.toUTCString(),
			})

			res.status(200).send(note.content)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send('Error on the server.')
		})
	}
)

notesRouter.put('/',
	(req, res) => {
		const id = ObjectId().toString()

		Note.create({
			id,
			UserId: req.UserId,
			content: req.body
		})
		.then(result => {
			res.status(200).send({ id })
		})
		.catch(err => {
			console.error(err)
			res.status(500).send('Error on the server.')
		})
	}
)

notesRouter.post('/:id',
	(req, res) => {
		const id = ObjectId(req.params.id).toString()

		Note.update(
			{
				content: req.body,
			},
			{
				where: {
					id,
					UserId: req.UserId,
				}
			}
		)
		.then(result => {
			if (1 !== result[0]) {
				res.status(404).send('Not Found')
				return
			}

			res.status(200).send('Ok')
		})
		.catch(err => {
			console.error(err)
			res.status(500).send('Error on the server.')
		})
	}
)

notesRouter.delete('/:id',
	(req, res) => {
		const id = ObjectId(req.params.id).toString()

		Note.destroy({
			where: {
				id,
				UserId: req.UserId,
			}
		})
		.then(result => {
			if (1 !== result[0]) {
				res.status(404).send('Not Found')
				return
			}

			res.status(200).send('Ok')
		})
		.catch(err => {
			console.error(err)
			res.status(500).send('Error on the server.')
		})
	}
)

router.use('/notes', verifyToken, notesRouter)
router.get('/shared/:id', hello)

app.use('/api/v0', router)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
