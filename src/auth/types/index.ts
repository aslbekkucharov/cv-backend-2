import { User } from "src/users/entities/user.entity"

export type AuthResponse = {
    user: Omit<User, 'password'>
    tokens: Record<string, string>
}