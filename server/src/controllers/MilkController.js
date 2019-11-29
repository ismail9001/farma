const { Milk } = require('../models')

module.exports = {
	async get (req, res) {
		try {
			let milks = null
			milks = await Milk.findAll({
				order: [['date', 'DESC']]
			})
			res.send(milks)
		} catch (err) {
			console.log(err)
			res.status(500).send({
				error: 'an error has occured trying to fetch the milks'
			})
		}
	},
	async post (req, res) {
		console.log('9999')
		try {
			const milk = await Milk.create(req.body)
			res.send(milk)
		} catch (e) {
			console.log(e)
			res.status(400).send({
				error: 'Ошибка записи данных'
			})
		}
	},
	async delete (req, res) {
		try {
			const { milkId } = req.params
			const milk = await Milk.findByPk(milkId)
			if (!milk) {
				return res.status(403).send({
					error: 'нет прав для удаления данной записи'
				})
			}
			await milk.destroy()
			res.send(milk)
		} catch (err) {
			console.log(err)
			res.status(500).send({
				error: 'ошибка удаления записи'
			})
		}
	},
	async put (req, res) {
		try {
			await Milk.update(req.body, {
				where: {
					id: req.params.milkId
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
