import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    usuario: string

    @Column()
    password: string

    @Column()
    nombre: string

    @Column()
    correo: string

    @Column()
    fecha_registro: Date

    @Column()
    ultima_sesion: Date

    @Column()
    rol: string

    @Column()
    piso: string

}
