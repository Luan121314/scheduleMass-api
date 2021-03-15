import {randomBytes} from 'crypto';

function hashGenerator() {
    const hash = randomBytes(2).toString("hex")
    return hash;
}

export default hashGenerator;