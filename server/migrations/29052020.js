'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.renameColumn(
				'Polygons',
				'Area',
				'area'
			)
		])
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.renameColumn('Polygons', 'area', 'Area')
		])
	}
}
