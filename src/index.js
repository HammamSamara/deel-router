import url from 'url'
import { executeMiddlewares } from './execute'

export function router() {
    const handlers = {}
    const middlewares = []

    function match(req, res) {
        // execute app middlewares
        const middlewaresGenerator = executeMiddlewares(middlewares, req, res)

        // User generators to iterate through registered middlewares if any
        let next = middlewaresGenerator.next()
        while (!next.done) {
            req = next.value
            next = middlewaresGenerator.next(next.value)
        }

        const parsed = url.parse(req.url)
        const routeUrl = `/${req.method}${parsed.pathname}`

        if (routeUrl in handlers) {
            const handler = handlers[routeUrl]

            return handler(req, res)
        }

        // Handler not found
        // 404 response
        res.statusCode = 404
        res.end('Route not found');
    }

    function start() {
        return function (req, res) {
            match(req, res)
        }
    }

    function get(url, callback) {
        const routeUrl = `/GET${url}`
        handlers[routeUrl] = callback
    }

    function post(url, callback) {
        const routeUrl = `/POST${url}`
        handlers[routeUrl] = callback
    }

    function use(callback) {
        middlewares.push(callback)
    }

    return Object.assign({}, {
        start,
        get,
        post,
        use
    })
}
