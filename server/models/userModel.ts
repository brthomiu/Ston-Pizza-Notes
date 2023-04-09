import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  name: string;
  email: string;
  password: string;
}

// 2. Create a Schema correspondinsg to the document interface.
export const userSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 3. Create a Model.
export const User = model<IUser>("User", userSchema);
