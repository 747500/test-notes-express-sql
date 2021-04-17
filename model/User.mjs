
import sequelizejs from 'sequelize'
const { DataTypes } = sequelizejs

const UserSchema = {
	id: {
		type: DataTypes.STRING(24),
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING(32),
		allowNull: false,
		unique: true,
	},
	email: {
		type: DataTypes.STRING(255),
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING(32),
		allowNull: false
	}
}

export {
	UserSchema
}
