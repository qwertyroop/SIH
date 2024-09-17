// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri: string = process.env.MONGODB_URI as string;
const options: any = {};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

declare global {
  // Allow global variables in development
  // This is to prevent reinitialization of the MongoClient during HMR in development mode
  var _mongoClientPromise: Promise<MongoClient>;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the client is not recreated across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, don't use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise.
// By doing this, the client can be shared across functions and requests.
export default clientPromise;
