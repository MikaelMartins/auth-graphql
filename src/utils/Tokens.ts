import jwt from "jsonwebtoken"
import { env } from "../config/env.js"

export function generateAccessToken(userId: number) {
  return jwt.sign(
    { userId },
    env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  )
}

export function generateRefreshToken(userId: number) {
  return jwt.sign(
    { userId },
    env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  )
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: number }
}