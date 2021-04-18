
import sequelizejs from 'sequelize'
const { DataTypes } = sequelizejs

import { isNotEmpty, isMongoId } from './validate/index.mjs'

const NoteSchema = {
	id: {
		type: DataTypes.STRING(24),
		primaryKey: true,
		validate: { isMongoId }
	},
	content: {
		type: DataTypes.TEXT,
		validate: {
			len: [ 0, 1000 ]
		}
	},
	shared: {
		type: DataTypes.STRING(24),
		defaultValue: null,
		allowNull: true,
		unique: true,
		validate: {
			fn (value) {
				return null == value || isMongoId(value)
			}
		}
	}
}

export {
	NoteSchema,
}
