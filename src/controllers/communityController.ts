import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import AppError from "../error/AppError";
import Community from "../models/Community";
import CommunityRepository from "../repositories/CommunityRepositories";
import communityValidation from "../validation/communityValidation";
import communityView from "../views/communityView";

class CommunityController {
    async create(request: Request, response: Response) {
        const data = request.body;
        await communityValidation.create(data);

        const {
            name,
            capacity,
            address,
            time
        } = data;

        const communityRepository = getCustomRepository(CommunityRepository);

        const communityAlreadyExists = await communityRepository.findByName(name);

        if (communityAlreadyExists) {
            throw new AppError("community already exists", 404);
        }

        const community = communityRepository.create({
            name,
            capacity,
            address,
            time
        })

        const communityRegister = await communityRepository.save(community);

        return response.status(201).json(communityRegister);

    }

    async index(request: Request, response: Response) {

        const communityRepository = getRepository(Community);
        const communities = await communityRepository.find({
            relations: ["reservations"]
        });

        return response.json(communityView.renderMany(communities))

    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        await communityValidation.id(id);

        const communityRepository = getRepository(Community);
        const community = await communityRepository.findOne({
            where: { id }
        });

        if (!community) {
            throw new AppError("not found", 404);
        }

        await communityRepository.delete({ id });

        return response.sendStatus(204);

    }
}

export default new CommunityController();