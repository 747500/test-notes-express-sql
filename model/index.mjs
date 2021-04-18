
import sequelizejs from 'sequelize'
const { Sequelize, Model } = sequelizejs

import { UserSchema } from './User.mjs'
import { NoteSchema } from './Note.mjs'


const sequelize = new Sequelize(process.env.DB_URL)

const timestamps = true

const User = sequelize.define('User', UserSchema, { timestamps })

const Note = sequelize.define('Note', NoteSchema, { timestamps })


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
