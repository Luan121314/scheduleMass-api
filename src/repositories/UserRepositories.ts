import { EntityRepository, Repository } from "typeorm";
import User from "../models/User";

@EntityRepository(User)
class UserRepository extends Repository<User>{
    async findByEmail(email: string) {
        return await this.findOne({
            where: { email }
        })
    }
}

export default UserRepository