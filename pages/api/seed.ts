import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { InsertManyResult } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Insert multiple markers
    const result: InsertManyResult = await db.collection('markers').insertMany([
      { lat: 26.9124, lng: 75.7873, label: 'Jaipur' },
      { lat: 26.8467, lng: 80.9462, label: 'Lucknow' },
      { lat: 28.7041, lng: 77.1025, label: 'Delhi' },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error seeding data:', error);
    res.status(500).json({ error: 'Failed to seed data' });
  }
}
