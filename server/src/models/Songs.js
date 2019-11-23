module.exports = (sequelize, DataTypes) => {
	const Song = sequelize.define('Song', {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		artist: DataTypes.STRING,
		genre: DataTypes.STRING,
		album: DataTypes.STRING,
		albumImageUrl: DataTypes.STRING,
		youtubeId: DataTypes.STRING,
		lyrics: DataTypes.TEXT,
		tab: DataTypes.TEXT
	})
	return Song
}
