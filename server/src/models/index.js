const path = require('path')
const Sequelize = require('sequelize')
const config = require('../../config/config')
const db = {}

const sequelize = new Sequelize(
	config.development.database,
	config.development.username,
	config.development.password,
	{
		dialect: config.development.dialect,
		host: config.development.host
	}
)

const klaw = require('klaw')
const through2 = require('through2')

const excludeDirFilter = through2.obj(function (item, enc, next) {
	if (!item.stats.isDirectory()) this.push(item)
	next()
})

async function fn () {
	await klaw(__dirname)
		.pipe(excludeDirFilter)
		.on('data', item => {
			if (path.basename(item.path) !== 'index.js') {
				const model = sequelize.import(item.path)
				db[model.name] = model
			}
		})
		.on('end', () => {
			console.log(db)
		})

	await Object.keys(db).forEach(function (modelName) {
		if ('associate' in db[modelName]) {
			db[modelName].associate(db)
			console.log(2)
		}
	})
}

// Вызов fn
module.exports = fn().then(() => db).catch((error) => {
	console.log(error)
})
