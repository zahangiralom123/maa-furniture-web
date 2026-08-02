import mongoose from "mongoose";
const CONNECTION_STR = process.env.MONGO_URI as string;
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global{
    var mongooseCache : MongooseCache | undefined;
}
if(!CONNECTION_STR){
    throw new Error("Please define MONGO URI");
}
let cached = global.mongooseCache ?? {conn : null , promise : null};
global.mongooseCache = cached;

export async function connectDB()
{
    if(cached.conn)
    {
        return cached.conn
    }
    if(!cached.promise)
    {
        cached.promise = mongoose.connect(CONNECTION_STR, {dbName : "maa-furniture"});
    }
    cached.conn = await cached.promise;
    return cached.conn;
}