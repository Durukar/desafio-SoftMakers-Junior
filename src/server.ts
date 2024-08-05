import fastify, { FastifyInstance } from 'fastify'
import { prismaClient } from './lib/prisma-client'

const server: FastifyInstance = fastify()

const port: number = 3333
const host: string = '0.0.0.0'

interface UserCreate {
  name: string
  email: string
}

server.post<{ Body: UserCreate }>('/user', async (req, reply) => {
  const { name, email } = req.body

  const user = await prismaClient.users.create({
    data: {
      name,
      email,
    },
  })

  return reply.send(user)
})

server
  .listen({
    port,
    host,
  })
  .then(() => {
    console.log(`Server running!`)
  })
