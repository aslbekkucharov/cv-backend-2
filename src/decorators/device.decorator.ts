import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Device = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  return {
    ip: req.ip || 'unknown',
    agent: req.headers['user-agent'] || 'unknown'
  }
})
