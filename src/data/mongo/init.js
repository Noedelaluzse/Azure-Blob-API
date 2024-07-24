import mongoose from "mongoose";
import { envs } from "../../config/envs.js";

const dbConnect = async () => {
  const DB_URI = envs.MONGO_URL;
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("***** DB Connected *****");
    })
    .catch((err) => {
      console.log("***** Error de conexión *****");
    });
};


export { dbConnect };