import { User } from '@/users/entities/user.entity'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  about: string

  @Column('text', { nullable: false, array: true })
  skills: string[]

  @OneToOne(() => User, user => user.profile)
  @JoinColumn()
  user: User
}
