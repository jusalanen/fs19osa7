const http = require('http')
const App = require('./App')
const config = require('./utils/config')

const server = http.createServer(App)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})