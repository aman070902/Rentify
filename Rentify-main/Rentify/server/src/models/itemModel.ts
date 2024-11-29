import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  itemId: { type: String, unique: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  postDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Available' },
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;

