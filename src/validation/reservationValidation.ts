import * as yup from 'yup';
import Generic from './Generic';

interface ReservationProps{
    name: string,
    email: string,
    phone: string,
    companion: number,
    community_id: string
}

class ReservationValidation extends Generic {

    async create(data: ReservationProps){
        const schema  = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            phone: yup.string().required().min(9),
            companion: yup.number().required().min(0).max(4),
            community_id: yup.string().required().uuid()
        })

        await schema.validate(data, {
            abortEarly: false
        })
    }
}

export default new ReservationValidation();