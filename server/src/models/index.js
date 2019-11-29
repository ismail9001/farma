const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
	config.db.database,
	config.db.user,
	config.db.password,
	config.db.options
)

var searchRecursive = function (dir, pattern) {
	// This is where we store pattern matches of all files inside the directory
	var results = []

	// Read contents of directory
	fs.readdirSync(dir).forEach(function (dirInner) {
		// Obtain absolute path
		dirInner = path.resolve(dir, dirInner)

		// Get stats to determine if path is a directory or a file
		var stat = fs.statSync(dirInner)

		// If path is a directory, scan it and combine results
		if (stat.isDirectory()) {
			results = results.concat(searchRecursive(dirInner, pattern))
		}

		// If path is a file and ends with pattern then push it onto results
		if (stat.isFile() && !dirInner.endsWith(pattern)) {
			const model = sequelize.import(dirInner)
			db[model.name] = model
		}
	})

	return results
}

searchRecursive(__dirname, 'index.js')

Object.keys(db).forEach(function (modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
