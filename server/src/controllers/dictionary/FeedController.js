const { Feed } = require('../../models/')

module.exports = {
	async get (req, res) {
		try {
			let feeds = null
			feeds = await Feed.findAll()
			res.send(feeds)
		} catch (err) {
			console.log(err)
			res.status(500).send({
				error: 'an error has occured trying to fetch the feeds'
			})
		}
	},
	async post (req, res) {
		try {
			const feed = await Feed.create(req.body)
			res.send(feed)
		} catch (e) {
			console.log(e)
			res.status(400).send({
				error: 'Ошибка записи данных'
			})
		}
	},
	async delete (req, res) {
		try {
			const { feedId } = req.params
			const feed = await Feed.findByPk(feedId)
			if (!feed) {
				return res.status(403).send({
					error: 'нет прав для удаления данной записи'
				})
			}
			await feed.destroy()
			res.send(feed)
		} catch (err) {
			console.log(err)
			res.status(500).send({
				error: 'ошибка удаления записи'
			})
		}
	},
	async put (req, res) {
		try {
			await Feed.update(req.body, {
				where: {
					id: req.params.feedId
				}
			})
			res.send(req.body)
		} catch (e) {
			res.status(400).send({
				error: 'Ошибка обновления записи'
			})
		}
	}
}
