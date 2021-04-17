
import sequelizejs from 'sequelize'
const { DataTypes } = sequelizejs

import { isObjectId } from './validators/objectid.mjs'

const NoteSchema = {
	id: {
		type: DataTypes.STRING(24),
		primaryKey: true,
		validate: {
			len: 24,
			isObjectId
		}
	},
	content: {
		type: DataTypes.TEXT,
		validate: {
			len: [ 0, 1000 ]
		}
	}
}

export {
	NoteSchema,
}
