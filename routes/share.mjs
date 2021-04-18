
import express from 'express'
import bodyParser from 'body-parser'

import * as mw from '../mw/index.mjs'


const share = express.Router()

share.use(bodyParser.json())

share.get('/:id',
	mw.checkId,
	mw.share.read
)

share.patch('/:id',
	mw.checkId,
	mw.share.update
)


export {
	share,
}
