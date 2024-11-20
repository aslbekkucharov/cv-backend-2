import slugify from "slugify";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    shortDescription: string

    @Column()
    content: string

    @Column({ unique: true })
    slug: string

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        const date = new Date()
        const humanReadableDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getTime()}`
        const slug = slugify(this.title, { lower: true, strict: true })
        this.slug = `${slug}-${humanReadableDate}`
    }

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.posts, { eager: false, nullable: false })
    user: User
}
