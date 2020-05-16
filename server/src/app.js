const specs = require('./swagger')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('../config/config')
const swaggerUi = require('swagger-ui-express') // под сомнением
const { sequelize } = require('./models')
// const swaggerDocument = require('./swagger.json') // под сомнением

// router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs.default))
// var options = { explorer: true } // под сомнением

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs.default)) // под сомнением

require('./passport')
require('./routes')(app)

sequelize.sync({ force: false })
	.then(() => {
		app.listen(config.development.port)
		console.log(`Server started on port ${config.development.port}`) // TODO: разобраться с двумя файлами конфигов
	})

// Вызов fn
module.exports = app // для тестирования
// TODO: настроить миграции чтобы запускались без порта, а сервер стартовал с портом
