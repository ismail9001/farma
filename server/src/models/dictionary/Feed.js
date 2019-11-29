module.exports = (sequelize, DataTypes) => {
	const Feed = sequelize.define('Feed', {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		}
	})
	return Feed
}

