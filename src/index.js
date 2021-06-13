const Hapi = require('@hapi/hapi')

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
})

server.route({
  method: 'GET',
  path: '/test',
  handler: (request, h) => {
    return 'Hello world'
  },
})

const init = async () => {
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: true,
      logEvents: ['response', 'onPostStart'],
    },
  })

  await server.register({
    plugin: require('hapi-ending'),
    options: {
      enabled: true,
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
