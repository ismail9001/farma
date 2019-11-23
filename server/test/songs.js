// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

// const mongoose = require('mongoose')
// const Book = require('../app/models/book')

// Подключаем dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/app')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
chai.use(chaiHttp)
// Наш основной блок

// eslint-disable-next-line no-undef
describe('Songs', () => {
	/* beforeEach((done) => { // Перед каждым тестом чистим базу
		Book.remove({}, (err) => {
			done()
		})
	}) */
	/*
      * Тест для /GET
      */
	// eslint-disable-next-line no-undef
	describe('/GET songs', () => {
		// eslint-disable-next-line no-undef
		it('it should GET all the songs', (done) => {
			chai.request(server)
				.get('/songs')
				// eslint-disable-next-line handle-callback-err
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(5)
					done()
				})
		})
	})
	// eslint-disable-next-line no-undef
	describe('/POST song', () => {
		// eslint-disable-next-line no-undef
		it('it should not POST a book without pages field', (done) => {
			const song = {
				title: 'The Lord of the Rings',
				artist: 'J.R.R. Tolkien',
				album: 1954
			}
			chai.request(server)
				.post('/song')
				.send(song)
				// eslint-disable-next-line handle-callback-err
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					// res.body.should.have.property('error').eql('you do not have access to this resource');;
					// res.body.error.should.have.property('pages');
					// res.body.errors.pages.should.have.property('kind').eql('required');
					done()
				})
		})
	})
})
