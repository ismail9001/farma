const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoriesController = require('./controllers/HistoriesController')
const MilkController = require('./controllers/MilkController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
	app.post('/register',
		AuthenticationControllerPolicy.register,
		AuthenticationController.register)
	app.post('/login',
		AuthenticationController.login)
	app.get('/songs',
		SongsController.getAllSongs)
	app.get('/song/:songId',
		SongsController.show)
	app.post('/song',
		SongsController.createSong)
	app.put('/song/:songId/edit',
		SongsController.put)
	app.get('/bookmarks',
		isAuthenticated,
		BookmarksController.index)
	app.post('/bookmarks',
		isAuthenticated,
		BookmarksController.post)
	app.delete('/bookmarks/:bookmarkId',
		isAuthenticated,
		BookmarksController.delete)
	app.get('/histories',
		isAuthenticated,
		HistoriesController.index)
	app.post('/histories',
		isAuthenticated,
		HistoriesController.post)
	app.get('/milk',
		MilkController.get)
	app.post('/milk',
		MilkController.post)
	app.delete('/milk/:milkId',
		MilkController.delete)
	app.put('/milk/:milkId',
		MilkController.put)
}
