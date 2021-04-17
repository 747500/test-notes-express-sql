
import sequelizejs from 'sequelize'
const { DataTypes } = sequelizejs

const NoteSchema = {
	id: {
		type: DataTypes.STRING(24),
		primaryKey: true,
	},
	content: {
		type: DataTypes.TEXT,
	}
}

export {
	NoteSchema,
}
