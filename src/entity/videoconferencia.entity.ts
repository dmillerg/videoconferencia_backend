import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany, JoinColumn } from "typeorm"
import { Sindicato } from "./sindicato.entity"
import { Usuario } from "./usuario.entity"

@Entity()
export class VideoConferencia {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    descripcion: string

    @Column()
    citado_por: string

    @Column()
    estado: number

    @CreateDateColumn()
    fecha: Date

    @ManyToOne(type => Usuario)
    @JoinColumn()
    encargado: Usuario

    @ManyToOne(type => Usuario)
    @JoinColumn()
    tecnico_respaldo: Usuario

    @Column()
    mannana: boolean

    @Column()
    tarde: boolean

    @CreateDateColumn()
    hora_inicio: Date

    @CreateDateColumn()
    hora_fin: Date

    @Column()
    not_allowed: boolean

    @Column()
    archivo: string

    @Column()
    cant_personas: number

    @Column()
    salon: string

    @ManyToOne(type=>Sindicato)
    @JoinColumn()
    sindicato: Sindicato;
}
