const { Polygon } = require('../models')

module.exports = {
	async get (req, res) {
		try {
			let polygons = null
			polygons = await Polygon.findAll()
			res.send(polygons)
		} catch (err) {
			console.log(err)
			res.status(500).send({
				error: 'an error has occured trying to fetch polygons'
			})
		}
	},
	async post (req, res) {
		try {
			const polygon = await Polygon.create(req.body)
			res.send(polygon)
		} catch (e) {
			console.log(e)
			res.status(400).send({
				error: 'Ошибка записи данных'
			})
		}
	},
	async delete (req, res) {
		try {
			const { polygonUuid } = req.params
			const polygon = await Polygon.findByPk(polygonUuid)
			if (!polygon) {
				return res.status(403).send({
					error: 'Нет прав для удаления данной области'
				})
			}
			await polygon.destroy()
			res.send(polygon)
		} catch (err) {
			console.log(err)
			res.status(500).send({
				error: 'ошибка удаления объекта'
			})
		}
	},
	async put (req, res) {
		try {
			await Polygon.update(req.body, {
				where: {
					uuid: req.params.polygonUuid
				}
			})
			res.send(req.body)
		} catch (e) {
			console.log(e)
			res.status(400).send({
				error: 'Ошибка обновления объекта на карте'
			})
		}
	}
}
