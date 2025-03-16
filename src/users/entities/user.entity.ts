import { Profile } from '@/profiles/entities/profile.entity'
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column()
  image: string

  @Column({ nullable: false, unique: true })
  username: string

  @Column({ nullable: false })
  password: string

  @Column({ default: false })
  isEmailVerified: boolean

  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
