import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany, OneToOne } from "typeorm"
import { Usuario } from "./usuario.entity"

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    token: string

    @Column()
    usuario_id: number
    
}
