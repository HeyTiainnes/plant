import { Router } from "express";
import autToken from "../../middleware/auth";
import PlantController from "../controllers/PlantController";

const plantRouter = Router();

const plantController = new PlantController();

plantRouter.get("/", (req, res) => plantController.getAllPlants(req, res));
plantRouter.get("/:id", autToken, (req, res) =>
  plantController.getOnePlant(req, res)
);
plantRouter.post("/", autToken, (req, res) =>
  plantController.createOnePlant(req, res)
);
plantRouter.delete("/:id", autToken, (req, res) =>
  plantController.deleteOnePlant(req, res)
);
plantRouter.put("/:id", autToken, (req, res) =>
  plantController.updateOnePlant(req, res)
);
export default plantRouter;
