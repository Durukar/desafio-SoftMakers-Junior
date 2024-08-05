import { FastifyInstance } from 'fastify'
import { prismaClient } from '../lib/prisma-client'

interface Users {
  name: string
  email: string
  password: string
}

async function userRoutes(fastify: FastifyInstance) {
  /*
   * POST api/user/create
   */

  fastify.post<{ Body: Users }>('/create', async (req, reply) => {
    const { name, email, password } = req.body

    const user = await prismaClient.users.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    reply.send(user)
  })
}

export { userRoutes }
