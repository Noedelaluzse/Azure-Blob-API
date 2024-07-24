import { BlobServiceClient } from "@azure/storage-blob";
import { config } from "dotenv";

config();


const blobSevice = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);


export const createContainer = (req, res) => {
  try {
    const { container } = req.body;
    blobSevice.createContainer(container);
    res.json({message: "success"});
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
}


export const deleteContainer = (req, res) => {
  try {
    const { container } = req.body;

    blobSevice.deleteContainer(container);

    res.json({message: "sucess"});
  } catch(error) {
    res.status(500).json({message: error.message});
  }
}

export const listContainer = async (req, res) => {

  try {

    const containers = [];

    for await ( const container of blobSevice.listContainers()) {
      containers.push(container.name);
    }

    res.json({containers});


  } catch(error) {
    res.status(500).json({message: error.message});
  }
}