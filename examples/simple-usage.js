const http = require('http')
const appRouter = require('../lib/index')

const router = appRouter.router()

// Define middlewares
router.use((req, res, next) => {
    // Attach anything on request
    req.attachGlobalUser = { user: 'Deel User' }

    // Call next on req
    return next(req)
})

router.use((req, res, next) => {
    // Global user is there
    console.log(req.attachGlobalUser)

    return next(req)
})

// Example Get route
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`Hello ${req.attachGlobalUser.user}!`);
    res.end()
})

// Example Post route
router.post('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ Hello: 'World!' }))
    res.end()
})

const server = http.createServer(router.start())

const port = 8000
server.listen(port, () => console.log(`App listening on port ${port}`))
