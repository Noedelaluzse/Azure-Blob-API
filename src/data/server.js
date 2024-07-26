import express  from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { envs } from "../config/envs.js"

import { dbConnect } from "../data/mongo/init.js";
import { blobRouter } from '../../src/routes/blob/blobs.routes.js';
import { containerRouter } from '../../src/routes/container/container.routes.js';
import { authRouter } from '../../src/routes/auth/auth.routes.js';

class Server {

  constructor() {
    this.app = express();
    this.port = envs.PORT;
    this.paths  = {
      auth: '/api/auth',
      blob: '/api/storage/blob',
      container: '/api/storage/container'
    }

    // conectar a la base de datos
    this.connectDB();

    this.middlewares();
    this.routes();
  }

  async connectDB() {
    //! TODO: Hacer la conexión
    await dbConnect();
  }

  middlewares() {

    // Cors
    this.app.use(cors());

    // Lectura y parseo del body;
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    // Directorio publico
    this.app.use(express.static(envs.PUBLIC_PATH));

    // this.app.use(fileUpload( {
    //   useTempFiles: true,
    //   tempFileDir: '/tmp/',
    //   createParentPath: true
    // }));
  }

  routes() {
    this.app.use(this.paths.auth, authRouter); //! TODO: Agregar path a las rutas de auth
    this.app.use(this.paths.container, containerRouter); //! TODO; Agregar path a las rutas de usuarios
    this.app.use(this.paths.blob, blobRouter); //! TODO: Agregar path a las rutas de uploads
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corrriendo en el puerto ${this.port}`);
    });
  }
}


export { Server };