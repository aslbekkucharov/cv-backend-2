export interface RequestUser {
  userId: number
  username: string
}

export interface RefreshTokenSessionGeneratorPayload {
  ip: string
  agent: string
  user: RequestUser
  refreshToken: string
}

export interface JwtPayload {
  iat: number
  exp: number
  userId: number
  username: string
}

export interface DeviceInfo {
  ip: string
  agent: string
}

export interface CookiePayload {
  sessionId: string
  refreshToken: string
}
