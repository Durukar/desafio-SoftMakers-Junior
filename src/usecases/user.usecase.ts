import {
  UserLogged,
  UserLogin,
  UserResponse,
  Users,
} from '../interfaces/user.interface'
import { compare, hash } from 'bcryptjs'
import { prismaClient } from '../lib/prisma-client'
import { sign } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AuthException } from '../exceptions/auth.exception'

dotenv.config()

class UserUseCase {
  async createUser({ email, name, password }: Users): Promise<UserResponse> {
    if (!email) {
      throw new Error('Email incorrect')
    }

    const userAlreadyExists = await prismaClient.users.findFirst({
      where: {
        email,
      },
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    // Criptografar senha
    const passwordHash = await hash(password, 8)

    // Cadastro de usuario

    const user = await prismaClient.users.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return user
  }

  async login({ email, password }: UserLogin): Promise<UserLogged> {
    // Verificar email
    const user = await prismaClient.users.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new AuthException()
    }

    // Verifica senha
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AuthException()
    }

    // Tudo dando certo gera token
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET || '',
      {
        subject: user.id,
        expiresIn: '30d',
      },
    )

    // retorna as infos
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    }
  }
}

export { UserUseCase }
