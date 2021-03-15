import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Reservation from "./Reservation";

@Entity("community")
class Community {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @Column()
    time: string;

    @Column()
    address: string;

    @OneToMany(() => Reservation, reservation => reservation.community)
    reservations: Reservation[];

    @CreateDateColumn({ type: "timestamp", default: () => "now()" })
    created_at: Date;

}

export default Community;