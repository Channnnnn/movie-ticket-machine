const routes = require('next-routes')

module.exports = routes()
.add('movie', '/movie/:id', 'movie')
.add('ticket', '/ticket/:id', 'ticket')
.add('search', '/', 'index')