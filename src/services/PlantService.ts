import AppDataSource from "../data-source";
import Plant from "../models/interfaces/PlantInterface";

class PlantService {
  getAllPlants(): Promise<Plant[]> {
    return AppDataSource.query(`SELECT * FROM plant ;`);
  }
  getOnePlant(id: number): Promise<Plant[]> {
    console.log(id);
    return AppDataSource.query(`SELECT * FROM plant where id=${id} ;`);
  }
  createOnePlant(body: Plant): Promise<Plant> {
    console.log(body);
    return AppDataSource.query(
      `insert into plant (name, unitprice_ati, quantity, category, url_picture)
       values ('${body.name}', '${body.unitprice_ati}', '${body.quantity}', '${body.category}', '${body.url_picture}');`
    );
  }
  deletePlant(id: number): Promise<Plant> {
    console.log(id);
    return AppDataSource.query(`DELETE FROM plant where id=${id};`);
  }
  updatePlant(id: number, body: Plant): Promise<Plant> {
    return AppDataSource.query(`UPDATE plant
SET name = '${body.name}', unitprice_ati = '${body.unitprice_ati}', quantity = '${body.quantity}', category = '${body.category}', url_picture = '${body.url_picture}'
WHERE id=${id};`);
  }
}

export default PlantService;
