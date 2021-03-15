import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Reservation from "./Reservation";

@Entity("user")
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @OneToMany(()=> Reservation, reservation => reservation.user )
    reservation: Reservation;

    @CreateDateColumn({ type: "timestamp", default: () => "now()" })
    created_at: Date;

}

export default User;