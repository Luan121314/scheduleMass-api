import Community from "../models/Community";
import countReservation from "../utils/countReservation";
import limiterCalculator from "../utils/limiterCalculator";

class CommunityViews {
    render(community: Community) {
        const { address, capacity, name, id, created_at, reservations, time } = community;
        const limiter = limiterCalculator(capacity);
        const reservation = countReservation(reservations)
        const communityObject = {
            id,
            name,
            capacity,
            time,
            limiter,
            reservation,
            address,
            created_at
        }

        return communityObject;
    }
    renderMany(communities: Community[]) {
        return communities.map(community => this.render(community))
    }

}

export default new CommunityViews;