import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Community from "./Community";
import User from './User';

@Entity("reservation")
class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    companion: number;

    @Column()
    password: string;

    @ManyToOne(()=> User, user => user.reservation )
    user: User;

    @ManyToOne(()=> Community, community => community.reservations )
    community: User;


    @CreateDateColumn({ type: "timestamp", default: () => "now()" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "now()" })
    updated_at: Date;

}

export default Reservation;