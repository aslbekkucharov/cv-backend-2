import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number
}
