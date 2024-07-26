# Azure-Blob Storage + Node.js and MongoDB


This is a simple example of how to use Azure Blob Storage and MongoDb with Node.js.

## Getting Started
This project is a simple example of how to use Azure Blob Storage with Node.js. It allows you to upload a file to Azure Blob Storage and create a container in Azure Blob Storage. The project also allows you to create a user on MongoDB and authenticate the user. The project uses the Azure Storage SDK, Azure Identity, Express, and Mongoose libraries.

If the user is not authenticated, the user will not be able to upload a file to Azure Blob Storage or create a container in Azure Blob Storage. The rol of the user is important because the user can only create a container in Azure Blob Storage if the user is an admin.

The project consists of three routes:

* auth: api/auth,
* blob: api/storage/blob,
* container: api/storage/container

### Routes

#### Auth
api/auth is a route that allows you to create a user on mongoDB and authenticate the user.

#### Blob
api/storage/blob is a route that allows you to upload a file to Azure Blob Storage.

#### Container
api/storage/container is a route that allows you to create a container in Azure Blob Storage.


### Libraries

The project uses the following libraries:

- [Azure Storage SDK](https://www.npmjs.com/package/@azure/storage-blob)
- [Express](https://www.npmjs.com/package/express)
- [Mongoose](https://www.npmjs.com/package/mongoose)


### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Azure Storage Account](https://azure.microsoft.com/en-us/services/storage/blobs/)

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory and add the following:

```bash
AZURE_STORAGE_ACCOUNT_NAME=<YOUR_STORAGE
AZURE_STORAGE_ACCOUNT_ACCESS_KEY=<YOUR
AZURE_STORAGE_CONTAINER_NAME=<YOUR_CONTAINER_NAME>
AZURE_DATA_LAKE_ACCOUNT_NAME=<YOUR_DATA_LAKE_ACCOUNT_NAME>
AZURE_DATA_LAKE_CLIENT_ID=<YOUR_DATA_LAKE_CLIENT_ID>
AZURE_DATA_LAKE_CLIENT_SECRET=<YOUR
AZURE_DATA_LAKE_TENANT_ID=<YOUR_DATA_LAKE_TENANT_ID>
AZURE_DATA_LAKE_DIRECTORY_NAME=<YOUR_DATA_LAKE_DIRECTORY_NAME>
```

### Usage

```bash
npm start
```
