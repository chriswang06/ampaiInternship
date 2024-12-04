"use server";
import clientPromise from "../lib/data";
const client = await clientPromise;
const db = client.db("ampai");
db.collection("vendors").createIndex({"vendor_name":"text"});

export const getCompanies= async (searchEntry:string)=>{
    try {
 
        const vendors = await db
            .collection("vendors")
            // .find({"vendor_name":{$regex: searchEntry}})
            .find({$text: {$search : await searchEntry}})
            .limit(1000)
            .toArray();
        return {
            props: { vendors: await JSON.parse(JSON.stringify(vendors)) },
        };
    } catch (e) {
        console.error(e);
        return { props: { vendors: [] } };
    }

}