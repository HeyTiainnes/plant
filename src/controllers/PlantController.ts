import { Request, Response } from "express";
import PlantService from "../services/PlantService";

class PlantController {
  public plantService = new PlantService();

  async getAllPlants(req: Request, res: Response): Promise<void> {
    try {
      const allPlants = await this.plantService.getAllPlants();
      res.send({ status: "OK", data: allPlants });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  async getOnePlant(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;

    try {
      const onePlant = await this.plantService.getOnePlant(Number(paramId));
      res.send({ status: "OK", data: onePlant });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  async createOnePlant(req: Request, res: Response): Promise<void> {
    const body = req.body;
    console.log(body);
    try {
      const createPlant = await this.plantService.createOnePlant(body);
      res.send({ status: "OK", data: createPlant });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
}

export default PlantController;
