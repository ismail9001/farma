module.exports = (sequelize, DataTypes) => {
	const Polygon = sequelize.define('Polygon', {
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true
		},
		marker: {
			type: DataTypes.GEOMETRY,
			allowNull: false
		},
		color: {
			type: DataTypes.STRING,
			allowNull: false
		},
		cadastrNumber: {
			type: DataTypes.STRING,
			allowNull: true
		}
	})
	return Polygon
}
