import * as yup from 'yup';
import Generic from './Generic';

interface CommunityProps {
    name: string,
    capacity: number,
    address: string,
}

class CommunityValidation extends Generic {

    async create(data: CommunityProps) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            address: yup.string().required(),
            time: yup.string().required(),
            capacity: yup.number().required()
        })

        await schema.validate(data, {
            abortEarly: false
        })
    }
}

export default new CommunityValidation();