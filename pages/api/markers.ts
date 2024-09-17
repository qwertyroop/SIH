import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { Document } from 'mongodb';

interface MarkerData {
  lat: number;
  lng: number;
  label: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const documents: Document[] = await db.collection('markers').find({}).toArray();
    const markers: MarkerData[] = documents.map((doc) => ({
      lat: doc.lat,
      lng: doc.lng,
      label: doc.label,
    }));

    res.status(200).json(markers);
  } catch (error) {
    console.error('Error fetching markers:', error);
    res.status(500).json({ error: 'Unable to fetch markers' });
  }
}
