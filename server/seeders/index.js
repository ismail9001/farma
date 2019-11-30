const {
	sequelize,
	Feed,
	Day
} = require('../src/models/')

const Promise = require('bluebird')
const feeds = require('./feeds.json')
const days = require('./days.json')

sequelize.sync({ force: true })
	.then(async function () {
		await Promise.all(
			feeds.map(feed => {
				Feed.create(feed)
			})
		)
		await Promise.all(
			days.map(day => {
				Day.create(day)
			})
		)
	})
