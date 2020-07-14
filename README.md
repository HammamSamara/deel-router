# deel-router
a simple (demo) router mocking express that follows a minimalism life style

## Installation

From source:

```sh
git clone https://github.com:HammamSamara/deel-router.git
cd deel-router

npm install
npm run build
```

Run the tests to insure everything is working as expected:
```sh
npm run test
```

Navigate to the examples folder for a quick usage example.

You can run the examples directly as follows:

```
node examples/simple-usage.js
```
Or alternatively see the api to use the module in your project.

_**Project is not hosted on NPM since its for demo purposes.**_
## API

```js
const http  = require('http')
const Router  = require('deel-router')

const router = appRouter.router()
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Hello World!');
    res.end()
})

const server = http.createServer(router.start())

server.listen(8000)
```

This module can be used with a plain `http.createServer` object or other web frameworks.

## Router()

Returns an object with the handy methods `start`, `get`
, `post`, and `use`.

## router.use(callback)

Use the given method to inject middleware as many as required.
Note that middlewares are executed in the order they are
provided globally and on every request.

* Note: middlewares can mutate the `request` param, and should execute the `next` callback to keep chaining.

```js
router.use(function (req, res, next) {
  // do your things

  // continue to the next middleware
  return next(req)
})
```

## router\[method](path, handler)

The http methods supporting the routing functionality in `router`.

A `get` handler would be conventionally in the following form:
```js
// handle a `GET` request
router.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('Hello World!')
})
```

Example `post` request:
```js
// handle a `POST` request
router.post('/api', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ Hello: 'World!' }))
    res.end()
})
```
## License

[MIT](LICENSE)
