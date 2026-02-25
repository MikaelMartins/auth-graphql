import "reflect-metadata"
import { env } from "./config/env.js"
import { typeDefs } from "./schemas/Schema.js"
import { resolvers } from "./resolvers/Auth.resolver.js"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { AppDataSource } from "./config/data-source.js"


async function bootstrap() {

  await AppDataSource.initialize()

  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  })

  console.log(
      `🚀 Server running in ${env.NODE_ENV} at ${url}`
    )
}

bootstrap()