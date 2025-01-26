import { NestFactory } from '@nestjs/core'

import { AppModule } from '@/app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = app.get(ConfigService)

  app.setGlobalPrefix('api/v1')

  await app.listen(config.getOrThrow('APPLICATION_PORT'))
}

bootstrap()
