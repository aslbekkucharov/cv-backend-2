import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.use(cookieParser())
  app.setGlobalPrefix('/api/v1')

  await app.listen(PORT)
}

bootstrap()
