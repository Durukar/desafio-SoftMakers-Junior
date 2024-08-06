export interface Users {
  name: string
  email: string
  password: string
}

export interface UserResponse {
  id: string
  name: string
  email: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserLogged {
  id: string
  name: string
  email: string
  token: string
}
