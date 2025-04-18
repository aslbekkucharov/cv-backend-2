import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  userId: number

  @Column({ nullable: false })
  token: string

  @Column({ nullable: false })
  expiresIn: Date

  @Column({ nullable: false })
  device: string

  @Column({ nullable: false, default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date
}
