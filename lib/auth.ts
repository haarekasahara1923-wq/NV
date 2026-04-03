import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const hashPassword = (password: string) => bcrypt.hash(password, 12)
export const comparePassword = (plain: string, hash: string) => bcrypt.compare(plain, hash)

export const signToken = (payload: { userId: string; role: string; meCode?: string }) =>
  jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' })

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string
    role: string
    meCode?: string
  }
