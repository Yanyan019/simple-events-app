# backend/db_alter_coords.py

import pymongo
from pymongo import MongoClient
from datetime import datetime

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Create database
db = client['events_db']

# Create collection
collection = db['events_entries']

# Create indexes on 'lat' and 'lng'
collection.create_index([('lat', pymongo.ASCENDING)])
collection.create_index([('lng', pymongo.ASCENDING)])

print("Database and collection initialized with indexed fields.")
