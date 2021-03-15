import { Router } from "express";
import communityController from "./controllers/communityController";
import reservationController from "./controllers/reservationController";

const routes = Router();
//Reservation
routes.post("/reservations", reservationController.create);
routes.get("/reservations/:id", reservationController.show);
routes.get("/reservations", reservationController.index);
routes.delete("/reservations/:id", reservationController.delete);


//Community
routes.get("/communities", communityController.index);
routes.post("/communities", communityController.create);
routes.delete("/communities/:id", communityController.delete);




export default routes;