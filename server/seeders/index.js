const {
	sequelize,
	Feed,
	Milk
} = require('../src/models/')

const Promise = require('bluebird')
const feeds = require('./feeds.json')
const milks = require('./milks.json')

sequelize.sync({ force: true })
	.then(async function () {
		await Promise.all(
			feeds.map(feed => {
				Feed.create(feed)
			})
		)
		await Promise.all(
			milks.map(milk => {
				Milk.create(milk)
			})
		)
	})
