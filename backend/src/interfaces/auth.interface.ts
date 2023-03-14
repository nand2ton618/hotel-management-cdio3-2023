import { JwtPayload } from 'jsonwebtoken'

export interface Token {
  accessToken: string
  refreshToken: string
}

export interface TokenPayload extends JwtPayload {
  role?: string
}
