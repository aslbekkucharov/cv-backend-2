import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Request } from "express"

export interface Pagination {
    page: number
    size: number
    limit: number
    offset: number
}

export const PaginationParams = createParamDecorator((data: unknown, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest()
    const page: number = parseInt(req.query.page as string) || 0
    const size: number = parseInt(req.query.size as string) || 20

    if (isNaN(page) || page < 0 || isNaN(size) || size < 0) {
        throw new BadRequestException('Недопустимые значения для параметров пагинации')
    }

    if (size > 100) {
        throw new BadRequestException('Недопустимые значения для параметров пагинации: максимальный размер 100')
    }

    const limit = size
    const offset = page * limit

    return {
        page,
        size,
        limit,
        offset
    }
})