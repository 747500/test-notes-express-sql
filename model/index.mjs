
import sequelizejs from 'sequelize'
const { Sequelize, Model } = sequelizejs

import { UserSchema } from './User.mjs'
import { NoteSchema } from './Note.mjs'


//const sequelize = new Sequelize('sqlite::memory')
const sequelize = new Sequelize(process.env.DB_URL)

const timestamps = true

class User extends Model {}
User.init(UserSchema, { sequelize, timestamps })

class Note extends Model {}
Note.init(NoteSchema, { sequelize, timestamps })


User.hasMany(Note, {
	onUpdate: 'RESTRICT',
	onDelete: 'CASCADE',
})

User.sync()
Note.sync()

export {
	sequelize,
	User,
	Note,
}
