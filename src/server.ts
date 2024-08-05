import fastify, { FastifyInstance } from 'fastify'
import { userRoutes } from './routes/users.routes'

const server: FastifyInstance = fastify()

const port: number = 3333
const host: string = '0.0.0.0'

// User routes
server.register(userRoutes, {
  prefix: '/api/user',
})

server
  .listen({
    port,
    host,
  })
  .then(() => {
    console.log(`Server running!`)
  })
