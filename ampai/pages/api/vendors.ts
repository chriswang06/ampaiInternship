
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { search } = req.query;
    const client = await clientPromise;
    const db = client.db('ampai');
    
    try {
        console.log('Search query:', search);

        const vendors = await db
            .collection('vendors')   
            .find({"vendor_name": {$regex : search}})
            .toArray();

        res.status(200).json({ vendors });

    } catch (error) {
        console.error('Error fetching vendors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
