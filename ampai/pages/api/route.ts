import {NextResponse} from 'next/server'
import clientPromise from "../lib/data";

export async function GET(){
    const client = await clientPromise;
        const db = client.db("ampai");
        const vendors = await db
            .collection("vendors")
            .find({})
            .limit(1000)
            .toArray();
        return {
            props: { vendors: await JSON.parse(JSON.stringify(vendors)) },
        };
}
