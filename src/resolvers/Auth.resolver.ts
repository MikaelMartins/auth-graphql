import { AuthService } from "../services/Auth.service.js"
import { registerSchema, loginSchema } from "../validators/Auth.schema.js"

export const resolvers = {

  Mutation: {

    register: async (_: unknown, args: any) => {
      const data: loginSchema = registerSchema.parse(args)
      return AuthService.register(data.email, data.password)
    },

    login: async (_: unknown, args: any) => {
      const data: loginSchema = registerSchema.parse(args)
      return AuthService.login(data.email, data.password)
    },

    refreshToken: async (_: unknown, { token }: any) => {
      return AuthService.refresh(token)
    }
  }
}