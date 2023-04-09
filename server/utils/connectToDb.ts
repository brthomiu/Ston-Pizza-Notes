import mongoose from "mongoose";
import dotenv from "dotenv";
import log from "./logger";

dotenv.config();

async function connectToDb() {
  const dbUri = process.env.DB_URI!;
  try {
    await mongoose.connect(dbUri);
    log.info("Connected to DB")
  } catch (e) {
    process.exit(1);
  }
}

export default connectToDb