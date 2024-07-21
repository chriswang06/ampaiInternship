export default function run(){
    const { MongoClient } = require("mongodb");

  // Replace the uri string with your connection string.
  const uri = "mongodb://localhost:27017/";
  
  const client = new MongoClient(uri);
  
    const dbo = client.db('ampai');
    console.log(dbo);
    return dbo;
}