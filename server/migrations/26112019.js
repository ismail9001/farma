'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn(
			'milk',
			'date',
			{
				type: Sequelize.DATEONLY,
				allowNull: false
			}
		)
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.changeColumn(
			'milk',
			'date',
			{
				type: Sequelize.DATE,
				allowNull: false
			}
		)
	}
}
