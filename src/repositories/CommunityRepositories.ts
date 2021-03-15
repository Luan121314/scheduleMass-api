import { EntityRepository, Repository } from "typeorm";
import Community from "../models/Community";

@EntityRepository(Community)
class CommunityRepository extends Repository<Community>{
    async findById(id: string) {
        return await this.findOne({
            where: { id }
        })
    }

    async findByName(name: string) {
        return await this.findOne({
            where: { name }
        })
    }


}

export default CommunityRepository