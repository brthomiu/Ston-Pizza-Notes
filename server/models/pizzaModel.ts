import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

// 1. Create an interface representing a document in MongoDB.
export interface IPizza {
  owner: string;
  pizzaName: string;
  ingredients: string[];
  recipe: string;
}

// 2. Create a Schema correspondinsg to the document interface.
export const pizzaSchema = new Schema<IPizza>({
  owner: { type: String, required: true },
  pizzaName: { type: String, required: true },
  ingredients: { type: [String], required: true },
  recipe: { type: String, required: true },
});

// 3. Create a Model.
export const Pizza = model<IPizza>("Pizza", pizzaSchema);
