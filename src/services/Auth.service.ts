import { AppDataSource } from "../config/data-source.js"
import { User } from "../entities/User.entity.js"
import { RefreshToken } from "../entities/RefreshToken.entity.js"
import { hash, verify } from "../utils/Crypto.js"
import { generateAccessToken, generateRefreshToken } from "../utils/Tokens.js"

export class AuthService {

  static async register(email: string, password: string) {

    const userRepo = AppDataSource.getRepository(User)

    if (await userRepo.findOneBy({ email }))
      throw new Error("User already exists")

    const user = userRepo.create({
      email,
      password: await hash(password)
    })

    await userRepo.save(user)

    return this.issueTokens(user)
  }

  static async login(email: string, password: string) {

    const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.findOneBy({ email })

    if (!user) throw new Error("Invalid credentials")

    const valid = await verify(user.password, password)
    if (!valid) throw new Error("Invalid credentials")

    return this.issueTokens(user)
  }

  static async refresh(oldToken: string) {

    const repo = AppDataSource.getRepository(RefreshToken)

    const stored = await repo.findOne({
      where: { token: oldToken },
      relations: ["user"]
    })

    if (!stored || stored.revoked)
      throw new Error("Invalid refresh token")

    stored.revoked = true
    await repo.save(stored)

    return this.issueTokens(stored.user)
  }

  private static async issueTokens(user: User) {

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    const refreshRepo = AppDataSource.getRepository(RefreshToken)

    const entity = refreshRepo.create({
      token: refreshToken,
      user
    })

    await refreshRepo.save(entity)

    return { accessToken, refreshToken }
  }
}