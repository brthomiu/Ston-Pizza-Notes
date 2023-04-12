import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

// 1. Create an interface representing a document in MongoDB.
export interface IPizza {
  owner: string;
  pizzaName: string;
  ingredients: string[];
  recipe: string;
  likers: string[];
  image: string;
}

// 2. Create a Schema correspondinsg to the document interface.
export const pizzaSchema = new Schema<IPizza>({
  owner: { type: String, required: true },
  pizzaName: { type: String, required: true, unique: true },
  ingredients: { type: [String], required: true },
  recipe: { type: String, required: true },
  likers: { type: [String], required: false},
  image: { type: String, required: false}
});

// 3. Create a Model.
export const Pizza = model<IPizza>("Pizza", pizzaSchema);
