'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn(
				'Polygons',
				'cadastrNumber',
				{
					type: Sequelize.STRING
				}
			)
		])
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.removeColumn('Polygons', 'cadastrNumber')
		])
	}
}
