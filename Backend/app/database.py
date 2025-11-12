from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from decouple import config 


MONGO_URI = config("MONGO_URI")
MONGO_DB_NAME = config("MONGO_DB_NAME")

print(f"Conectando a la base de datos: '{MONGO_DB_NAME}'")

client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB_NAME]
