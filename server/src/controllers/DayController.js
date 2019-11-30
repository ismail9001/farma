const { Day } = require('../models')

module.exports = {
	async get (req, res) {
		try {
			let days = null
			days = await Day.findAll({
				order: [['date', 'DESC']]
			})
			res.send(days)
		} catch (err) {
			console.log(err)
			res.status(500).send({
				error: 'an error has occured trying to fetch the days'
			})
		}
	},
	async post (req, res) {
		try {
			const day = await Day.create(req.body)
			res.send(day)
		} catch (e) {
			console.log(e)
			res.status(400).send({
				error: 'Ошибка записи данных'
			})
		}
	},
	async delete (req, res) {
		try {
			const { dayId } = req.params
			const day = await Day.findByPk(dayId)
			if (!day) {
				return res.status(403).send({
					error: 'нет прав для удаления данной записи'
				})
			}
			await day.destroy()
			res.send(day)
		} catch (err) {
			console.log(err)
			res.status(500).send({
				error: 'ошибка удаления записи'
			})
		}
	},
	async put (req, res) {
		try {
			await Day.update(req.body, {
				where: {
					uuid: req.params.dayId
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
