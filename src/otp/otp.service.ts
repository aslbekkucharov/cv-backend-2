import { randomInt } from 'crypto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OtpService {
  generateOTP() {
    return randomInt(100000, 999999)
  }
}
