import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  owner: string;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
}

const itemSchema: Schema = new Schema({
  owner: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model<IItem>('Item', itemSchema);

export default Item;

