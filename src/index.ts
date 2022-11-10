import * as express from "express";
import AppDataSource from "./data-source";
// import bodyParser = require("body-parser");
import plantRouter from "./routes/PlantRouter";
import * as cors from "cors";
import path = require("path");

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.json()); // on paramètre la possibilité de récupérer des info dans un body en format JSON
    app.use(
      cors({
        origin: "*", // 'http://localhost:3000'
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    ); // on paramètre le fait qu'une appli puisse faire des requête avec ces méthodes référencées

    app.use(
      "/assets",
      express.static(path.join(__dirname, "../public/assets"))
    );

    app.use("/api/plant", plantRouter);

    app.listen(process.env.PORT, () => {
      console.log(
        `L'api est en route sur l'adresse localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(`Une erreur s'est produite :`, err);
  });
