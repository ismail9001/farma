'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn(
				'Polygons',
				'Area',
				{
					type: Sequelize.DataTypes.INTEGER
				}
			)
		])
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.removeColumn('Polygons', 'Area')
		])
	}
}
