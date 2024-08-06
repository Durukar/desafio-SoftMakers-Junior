import { FastifyInstance } from 'fastify'
import { UserLogin, Users } from '../interfaces/user.interface'
import { UserUseCase } from '../usecases/user.usecase'

async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase()

  /*
   * POST api/user/create
   */

  fastify.post<{ Body: Users }>('/create', async (req, reply) => {
    const data = req.body

    const user = userUseCase.createUser(data)

    return reply.send(user)
  })

  /*
   * POST api/user/login
   */

  fastify.post<{ Body: UserLogin }>('/login', async (req, reply) => {
    const data = req.body

    const userLogin = await userUseCase.login(data)

    return reply.send(userLogin)
  })
}

export { userRoutes }
