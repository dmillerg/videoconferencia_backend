import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn, Unique, TableUnique } from "typeorm"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    usuario: string

    @Column()
    password: string

    @Column()
    nombre: string

    @Column()
    correo: string

    @CreateDateColumn()
    fecha_registro: Date

    @CreateDateColumn()
    ultima_sesion: Date

    @Column()
    rol: string

    @Column()
    piso: string

}
