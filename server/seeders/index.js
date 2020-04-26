const {
	sequelize,
	Feed,
	Day,
	Polygon
} = require('../src/models/')

const Promise = require('bluebird')
const feeds = require('./feeds.json')
const days = require('./days.json')
const polygons = require('./polygons.json')

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
		await Promise.all(
			polygons.map(polygon => {
				Polygon.create(polygon)
			})
		)
	})
