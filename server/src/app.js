const specs = require('./swagger')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config/config')
const swaggerUi = require('swagger-ui-express') // под сомнением
// const swaggerDocument = require('./swagger.json') // под сомнением

// router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs.default))
// var options = {	explorer: true } // под сомнением

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs.default)) // под сомнением

require('./passport')
require('./routes')(app)

sequelize.sync({ force: false })
	.then(() => {
		app.listen(config.port)
		console.log(`Server started on port ${config.port}`)
	})

module.exports = app // для тестирования
