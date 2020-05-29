'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
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
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.changeColumn(
				'Polygons',
				'area',
				{
					type: Sequelize.INTEGER(),
					allowNull: true
				}
			)
		])
	}
}
