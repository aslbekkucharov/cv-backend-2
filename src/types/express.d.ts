import { User } from "src/users/entities/user.entity"

declare global {
    namespace Express {
        interface Request {
            user?: Pick<User, 'fullname' | 'email' | 'username'>
        }
    }
}