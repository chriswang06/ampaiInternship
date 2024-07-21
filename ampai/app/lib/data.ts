// import run from '@/app/lib/connect';
// import dbo from '@/app/lib/connect';
const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

  const dbo = client.db('ampai');

  export async function findOne(collection : string, name?:string){
    var coll = dbo.collection(collection);
    return coll.findOne(name)
  }
  export async function find(collection : string, name: string){
    var coll = dbo.collection(collection);
    return coll.find(name)
  }
  export async function fetchName(collection :string, id:Promise<any>){

    var cust= dbo.collection(collection).findOne({_id:id});
    return cust.Company_name;
  }
  export async function fetchID(collection:string, name:string){
    var coll = dbo.collection(collection);
    var cust = coll.findOne({company_name : name});
    return cust._id;
  }
  export async function randomID(){
    var coll = dbo.collection("customers");
    console.log("customer collection: " + coll);
    var customer = coll.findOne();
    return customer._id;
  }

