module.exports = (sequelize, DataTypes) => {
	const Day = sequelize.define('Day', {
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true
		},
		weight: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false
		}
	})
	return Day
}
