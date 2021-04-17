
import sequelizejs from 'sequelize'
const { DataTypes } = sequelizejs

import { isObjectId } from './validators/objectid.mjs'

const UserSchema = {
	id: {
		type: DataTypes.STRING(24),
		primaryKey: true,
		validate: {
			len: 24,
			isObjectId
		}
	},
	name: {
		type: DataTypes.STRING(32),
		allowNull: false,
		unique: true,
		validate: {
			isNotEmpty: true,
		}
	},
	email: {
		type: DataTypes.STRING(255),
		allowNull: false,
		unique: true,
		validate: {
			isNotEmpty: true,
			isEmail: true,
		}
	},
	password: {
		type: DataTypes.STRING(32),
		allowNull: false,
		validate: {
			isNotEmpty: true,
			len: [ 8, 32 ]
		}
	}
}

export {
	UserSchema
}
