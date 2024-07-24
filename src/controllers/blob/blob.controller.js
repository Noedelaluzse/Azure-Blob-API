import { BlobServiceClient } from "@azure/storage-blob";
import { config } from "dotenv";

config();

const blobSevice = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

export const uploadBlob = async(req, res) => {
  try {

    const { container } = req.body;
    const { originalname, buffer } = req.file;

    const containerClient = blobSevice.getContainerClient(container);

    await containerClient.getBlockBlobClient(originalname).uploadData(buffer);

    res.json({"message": "success"});

  } catch(error) {
    console.log(error);
    res.status(500).json({"message": error.message});
  }
}

export const getBlob = async (req, res) => {
  try {
    const { container, filename} = req.params;
    const containerClient = blobSevice.getContainerClient(container);
    
    res.header("Content-Type", "application/octet-stream"); // Para archivos pdf
    // res.header("Content-Type", "image/jpg"); // Para imagenes
    
    const response = await containerClient.getBlockBlobClient(filename).downloadToBuffer();

    res.send(response);
    
  } catch(error) {
    console.log(error);
    res.status(500).json({messa: error.message});
  }
}

export const downloadBlob = async (req, res) => {
  try {
    const { container, filename } = req.params;

    const containerClient = blobSevice.getContainerClient(container);

    const response = await containerClient.getBlockBlobClient(filename)
    .downloadToBuffer();

    res.send(response);

  } catch(error) {
    res.status(500).json({message: error.message});
  }
}

export const deleteBlob = async (req, res) => {

  try {

    const { container, filename } = req.body;

    const containerClient = blobSevice.getContainerClient(container);

    const response = await containerClient.getBlockBlobClient(filename).deleteIfExists();

    res.send(response);

  } catch(error) {
    res.status(500).json({message: error.message});
  }
}