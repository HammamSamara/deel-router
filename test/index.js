import http from 'http'
import sinon from 'sinon'
import assert from 'assert'
import request from 'supertest'

import { router as appRouter } from '../src/index'


let router
beforeEach(() => {
    router = appRouter()
})

describe('Http Verbs', () => {
    describe('GET /', () => {
        it('should respond with 200', (done) => {

            router.get('/', (req, res) => {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end()
            })

            const app = http.createServer(router.start())

            request(app)
                .get('/')
                .expect('Content-Type', 'text/html')
                .expect(200, done)

        })
    })

    describe('POST /api/v1', () => {
        it('should respond with 200', (done) => {

            router.post('/api/v1', (req, res) => {
                res.setHeader('Content-Type', 'application/json')
                res.end()
            })

            const app = http.createServer(router.start())

            request(app)
                .post('/api/v1')
                .expect('Content-Type', 'application/json')
                .expect(200, done)

        })
    })

    describe('POST /api/v2', () => {
        it('should respond with 404', (done) => {

            router.post('/api/v1', (req, res) => {
                res.setHeader('Content-Type', 'application/json')
                res.end()
            })

            const app = http.createServer(router.start())

            request(app)
                .post('/api/v2')
                .expect(404, done)

        })
    })
})

describe('Routes Middlewares', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
        sandbox.spy(router);
    });

    it('should attach user on request', (done) => {

        router.use((req, res, next) => {
            // Logger middleware

            return next(req)
        })

        router.use((req, res, next) => {
            req.attachGlobalUser = { user: 'Deel User' }

            return next(req)
        })

        router.get('/profile', (req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end()
        })

        const app = http.createServer(router.start())

        request(app)
            .get('/profile')
            .expect('Content-Type', 'text/html')
            .end((err, res) => {
                if (err) return done(err)

                assert.equal(true, router.use.calledTwice)

                done()
            })

    })
})
