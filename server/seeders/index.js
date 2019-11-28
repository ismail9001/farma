const {
	sequelize
} = require('../src/models/index')

const {
	Feed
} = require('../src/models/Feed.js')

const Promise = require('bluebird')
const feeds = require('./feeds.json')

sequelize.sync({ force: true })
	.then(async function () {
		await Promise.all(
			feeds.map(feed => {
				Feed.create(feed)
			})
		)
	})
