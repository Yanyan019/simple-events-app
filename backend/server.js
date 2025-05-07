import Fastify from 'fastify';
import cors from '@fastify/cors';
import formbody from '@fastify/formbody';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: true });
await fastify.register(formbody); // <- Needed for parsing request.body

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db('events_db');
const collection = db.collection('events_entries');

// Create Event
fastify.post('/api/events', async (request, reply) => {
  const { title, description, lat, lng } = request.body;
  const event = {
    title,
    description,
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    created_at: new Date(),
    updated_at: new Date(),
  };
  const result = await collection.insertOne(event);
  reply.send({ ...event, _id: result.insertedId });
});

// Get All Events
fastify.get('/api/events', async (request, reply) => {
  const events = await collection.find().toArray();
  reply.send(events);
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 Server running at ${address}`);
});
