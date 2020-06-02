'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.changeColumn(
				'Polygons',
				'area',
				{
					type: Sequelize.DECIMAL(),
					allowNull: false
				}
			)
		])
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.changeColumn(
				'Polygons',
				'area',
				{
					type: Sequelize.DECIMAL(),
					allowNull: true
				}
			)
		])
	}
}
