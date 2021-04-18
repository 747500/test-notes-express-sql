
import sequelizejs from 'sequelize'
const { DataTypes } = sequelizejs


import { isNotEmpty, isEmail, isMongoId } from './validate/index.mjs'


const UserSchema = {
	id: {
		type: DataTypes.STRING(24),
		primaryKey: true,
		validate: { isMongoId }
	},
	name: {
		type: DataTypes.STRING(32),
		allowNull: false,
		unique: true,
		validate: { isNotEmpty }
	},
	email: {
		type: DataTypes.STRING(255),
		allowNull: false,
		unique: true,
		validate: { isEmail }
	},
	password: {
		type: DataTypes.STRING(32),
		allowNull: false,
		validate: { isNotEmpty }
	}
}

export {
	UserSchema
}
