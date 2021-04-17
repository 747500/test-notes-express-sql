
import './env.mjs'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { api } from './routes/index.mjs'

const app = express()
const port = process.env.HTTP_PORT

app.use(morgan('dev'))
app.use(cors())

app.use('/api/v0', api)

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	console.log(`Example "Notes" app listening at http://localhost:${port}`)
})
