import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import AppError from "../error/AppError";
import manifest from "../manifest";
import Reservation from "../models/Reservation";
import CommunityRepository from "../repositories/CommunityRepositories";
import UserRepository from "../repositories/UserRepositories";
import SendMail from "../services/SendMail";
import countReservation from "../utils/countReservation";
import hashGenerator from "../utils/hashGenerator";
import limiterCalculator from "../utils/limiterCalculator";
import reservationValidation from "../validation/reservationValidation";
import { resolve } from 'path';

class ReservationController {
    async create(request: Request, response: Response) {
        const data = request.body;
        await reservationValidation.create(data);

        const {
            name,
            email,
            phone,
            companion,
            community_id
        } = data;

        const userRepository = getCustomRepository(UserRepository);
        const communityRepository = getCustomRepository(CommunityRepository);
        const reservationRepository = getRepository(Reservation);

        const community = await communityRepository.findById(community_id);

        if (!community) {
            throw new AppError("community not found", 404);
        }

        const emailAlreadyExists = await userRepository.findByEmail(email);

        if (emailAlreadyExists) {
            throw new AppError("email already exists", 404);
        }

        const reservations = await reservationRepository.find({
            where: { community: community.id }
        })

        const reservationNumbers = countReservation(reservations);

        const { capacity } = community;
        const limiter = limiterCalculator(capacity);

        if (reservationNumbers >= limiter) {
            throw new AppError("limit reached", 403);
        }


        const user = userRepository.create({ name, email, phone });
        const userRegister = await userRepository.save(user);

        const password = hashGenerator();
        const reservation = reservationRepository.create({
            user: userRegister,
            password,
            companion: Number(companion),
            community: community
        })
        const reservationRegister = await reservationRepository.save(reservation);

        const variables = {
            id: reservationRegister.id,
            name,
            title: manifest.title,
            baseUrl: manifest.baseUrlFrontEnd,
            user,
            companion: companion === 0 ? 'Apenas uma' : `Eu + ${reservation.companion}`,
            community,
            password
        }

        const path = resolve(__dirname, '..', 'views', 'emails', 'sendInformationUser.hbs')

        await SendMail.execute(email, `Reserva - ${manifest.title}`, variables, path)


        response.status(201).json({ ...userRegister, ...reservationRegister })


    }
    async show(request: Request, response: Response) {

        const { id } = request.params;
        await reservationValidation.id(id);

        const reservationRepository = getRepository(Reservation);
        try {
            const reservation = await reservationRepository.findOneOrFail({
                where: { id },
                relations: ["community", "user"]
            });

            return response.json(reservation)
        } catch (error) {
            return response.sendStatus(404);
        }

    }

    async index(request: Request, response: Response) {

        const reservationRepository = getRepository(Reservation);
        const reservation = await reservationRepository.find({
            relations: ["community", "user"]
        });

        return response.json(reservation)

    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        await reservationValidation.id(id);

        const reservationRepository = getRepository(Reservation);
        const reservation = await reservationRepository.findOne({
            where: { id },
            relations: ["user"]
        });

        if (!reservation) {
            throw new AppError("not found", 404);
        }

        const userRepository = getCustomRepository(UserRepository);

        await reservationRepository.delete({ id });
        await userRepository.delete({ id: reservation.user.id });

        return response.sendStatus(204);

    }
}

export default new ReservationController();