import { Request, Response } from "express";
import PlantService from "../services/PlantService";

class PlantController {
  public plantService = new PlantService();

  async getAllPlants(req: Request, res: Response): Promise<void> {
    try {
      const allPlants = await this.plantService.getAllPlants();
      res.send({
        status: "OK",
        data: allPlants,
        message: "voici toutes les plantes !",
      });
    } catch (error: any) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: error?.message || error },
        message: "erreur lors de la récupération des plantes !",
      });
    }
  }

  async getOnePlant(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    try {
      const onePlant = await this.plantService.getOnePlant(Number(paramId));
      res.send({
        status: "OK",
        data: onePlant,
        message: `Voici la plante avec l'id : ${paramId}`,
      });
    } catch (error: any) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: error?.message || error },
        message: `erreur lors de la récupération de la plante avec l'id : ${paramId}`,
      });
    }
  }
  async createOnePlant(req: Request, res: Response): Promise<void> {
    const body = req.body;
    console.log(body);
    try {
      const createPlant = await this.plantService.createOnePlant(body);
      console.log(createPlant);
      res.send({
        status: "OK",
        data: body,
        message: "Une nouvelle plante à été créé !! ",
      });
    } catch (error: any) {
      res.status(error?.status || 400).send({
        status: "FAILED",
        data: { error: error?.message || error },
        message:
          "erreur lors de la création d'une plante. Veuillez renseignez tous les champs correctement.",
      });
    }
  }
  async deleteOnePlant(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    try {
      const deletePlant = await this.plantService.deletePlant(Number(paramId));
      res.send({
        status: "OK",
        message: `Plant with id : ${paramId} was Delete`,
      });
    } catch (error: any) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: error?.message || error },
        message: "Erreur lors de la suppression de la plante",
      });
    }
  }
  async updateOnePlant(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    const body = req.body;
    try {
      const updatePlant = await this.plantService.updatePlant(
        Number(paramId),
        body
      );
      res.send({
        status: "OK",
        data: body,
        message: `Plant with id : ${paramId} was Update`,
      });
    } catch (error: any) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: error?.message || error },
        message: "Erreur lors de la modification de la plante",
      });
    }
  }
}

export default PlantController;
