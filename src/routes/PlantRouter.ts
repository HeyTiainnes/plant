import { Router } from "express";
import PlantController from "../controllers/PlantController";

const plantRouter = Router();

const plantController = new PlantController();

plantRouter.get("/", (req, res) => plantController.getAllPlants(req, res));
plantRouter.get("/:id", (req, res) => plantController.getOnePlant(req, res));
plantRouter.post("/", (req, res) => plantController.createOnePlant(req, res));

export default plantRouter;
