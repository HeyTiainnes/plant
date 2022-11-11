import AppDataSource from "../data-source";
import Plant from "../models/interfaces/PlantInterface";

class PlantService {
  getAllPlants(): Promise<Plant[]> {
    return AppDataSource.query(`SELECT * FROM plant;`);
  }
  getOnePlant(id: number): Promise<Plant[]> {
    console.log(id);
    return AppDataSource.query(`SELECT * FROM plant where id=${id};`);
  }
}

export default PlantService;
