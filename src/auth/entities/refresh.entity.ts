import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  token: string

  @Column({ nullable: false })
  username: string

  @Column({ nullable: false })
  expiryDate: Date
}
