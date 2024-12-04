// import { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../lib/data';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { search } = req.query;
//     const client = await clientPromise;
//     const db = client.db('ampai');
//     try {
//         console.log('search query', search);
//         if (typeof search === 'string') {
//           const vendors = await db
//             .collection('vendors')
//             .find({ $text: { $search: search } })
//             .toArray();
//             console.log('Vendors fetched:', vendors.length); // Log the number of vendors found

    
//           res.status(200).json({ vendors });
//         } else {
//           res.status(400).json({ error: 'Invalid search query' });
//         }
//       } catch (error) {
//         console.error('Error fetching vendors:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//     }
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
            // .find({ $text: { $search: search } })
            .find({"vendor_name": {$regex : search}})
            .toArray();

        // Return the results
        res.status(200).json({ vendors });

    } catch (error) {
        console.error('Error fetching vendors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
