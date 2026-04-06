export interface UserRegisterRequest {
  name: string,
  email: string, 
  password: string
}

export interface UserResponse {
  id: number,
  name: string,
  email: string
}

export interface LoginRequest {
  email: string,
  password: string
}

export interface LoginResponse {
  token: string,
  expiresIn: number
}