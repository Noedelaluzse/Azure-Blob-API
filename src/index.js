import { Server } from "./data/server.js";
// import express from 'express';
// import { blobRouter } from "../routes/blobs.routes.js";
// import { containerRouter} from "../routes/container.routes.js";

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));


// // Routes
// app.use("/storage/blob", blobRouter);
// app.use("/storage/container", containerRouter);

// app.listen(3000, () => console.log("http://localhost:3000"));


const server = new Server();
server.listen();