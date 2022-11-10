import AppDataSource from "../data-source";
import Plant from "../models/interfaces/PlantInterface";

class PlantService {
  getAllPlants(): Promise<Plant[]> {
    return AppDataSource.query(`SELECT * FROM plant;`);
  }
  getOnePlant(): Promise<Plant[]> {
    return AppDataSource.query(`SELECT id FROM plant where ;`);
  }
}

export default PlantService;
