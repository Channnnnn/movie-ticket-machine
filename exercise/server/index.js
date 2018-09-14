const express = require('express')
const next = require('next')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/api/shows', (req,res) => {
      return res.end("Debugging API")
    })

    // server.get('/api/dummy-data', (req,res) => {
    //   return res.json(
    //     [
    //       {name: "Deadpool2", duration: 95},
    //       {name: "Ghostland", duration: 125},
    //       {name: "Avengers : Infinity War", duration: 102},
    //       {name: "Midnight Sun", duration: 93},
    //       {name: "The Nun", duration: 87}
    //     ]
    //   )
    // })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack);
  });