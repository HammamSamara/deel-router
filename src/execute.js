export function* executeMiddlewares(middlewares, req, res) {

    for (const middleware of middlewares) {
        yield middleware(req, res, value => value)
    }
}
