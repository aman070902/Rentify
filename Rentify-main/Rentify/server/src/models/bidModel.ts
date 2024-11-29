import mongoose from 'mongoose';

const BidSchema = new mongoose.Schema({
  bidId: { type: String, unique: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bidAmount: { type: Number, required: true },
  bidTime: { type: Date, default: Date.now },
});

const Bid = mongoose.model('Bid', BidSchema);
export default Bid;

