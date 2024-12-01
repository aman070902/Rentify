import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for generating unique IDs

const ItemSchema = new mongoose.Schema({
  itemId: { type: String, unique: true, default: uuidv4 }, // Auto-generate unique itemId
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  postDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Available' },
});

// Add a text index for efficient search on title and description
ItemSchema.index({ title: 'text', description: 'text' });

const Item = mongoose.model('Item', ItemSchema);
export default Item;

