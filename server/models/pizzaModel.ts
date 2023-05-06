import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

// Create interfaces to represent document in MongoDB.

interface IIngredient {
  ingredient: string;
  amount: number;
  uom: string;
}

export interface IPizza {
  owner: string;
  pizzaName: string;
  ingredients: IIngredient[];
  recipe: string;
  likers: string[];
  image: string;
}

// Create a Schema correspondinsg to the document interface.
export const pizzaSchema = new Schema<IPizza>({
  owner: { type: String, required: true },
  pizzaName: { type: String, required: true, unique: true },
  ingredients: { type: [String], required: true },
  recipe: { type: String, required: true },
  likers: { type: [String], required: false},
  image: { type: String, required: false}
});

// Create a Model.
export const Pizza = model<IPizza>("Pizza", pizzaSchema);
