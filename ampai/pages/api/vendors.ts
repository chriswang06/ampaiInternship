
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { search } = req.query;
    const client = await clientPromise;
    const db = client.db('ampai');
    
    try {
        if(typeof search ==='string'){
            console.log('Search query:', search);
            let reg = new RegExp(search, "i");

            const vendors = await db
                .collection('vendors')   
                .find({"vendor_name": {$regex : reg}})
                .toArray();

            res.status(200).json({ vendors });
        }else{
            res.status(400).json({error: "Invalid Search query"});
        }
    } catch (error) {
        console.error('Error fetching vendors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
