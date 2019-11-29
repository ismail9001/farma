const {	sequelize, Feed } = require('../src/models/')

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
