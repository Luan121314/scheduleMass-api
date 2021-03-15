import manifest from "../manifest";

function limiterCalculator(capacity: number){
    const limiter = Math.ceil((capacity / 100) * manifest.limiter);
    return limiter;
}

export default limiterCalculator;