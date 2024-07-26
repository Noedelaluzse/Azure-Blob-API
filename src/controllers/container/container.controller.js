import { BlobServiceClient } from "@azure/storage-blob";
import { config } from "dotenv";
import { matchDataAdapter } from "../../config/validator.adapter.js";
import { UserModel } from "../../data/mongo/models/user.model.js";

config();


const blobSevice = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);


export const createContainer = (req, res) => {
  const { user } = req;

  try {
    const { container } = matchDataAdapter(req)

    if (user.rol !== 'admin') return res.status(400).json({message: 'This user does not have permission to create folders'});
    
    blobSevice.createContainer(container);
    res.json({message: "success", name: container});
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
}


export const deleteContainer = (req, res) => {
  const { user } = req;

  try {
    const { container } = matchDataAdapter(req)
    
    if (!container)  return res.status(400).json({message: 'No container name was provided'});

    if (user.rol !== 'admin') return res.status(400).json({message: 'This user does not have permission to delete folders'});
      

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