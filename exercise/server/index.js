const express = require('express')
const next = require('next')
const routes = require('../routes')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare()
  .then(() => {
    const server = express()
    server.use(handler).listen(3000)

    // server.get('/api/shows', (req,res) => {
    //   return res.end("Debugging API")
    // })

    // server.get('*', (req, res) => {
    //   return handle(req, res)
    // })

    // server.listen(port, (err) => {
    //   if (err) throw err
    //   console.log(`> Ready on http://localhost:${port}`)
    // })
  })
  .catch(ex => {
    console.error(ex.stack);
  });