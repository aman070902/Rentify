"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BidSchema = new mongoose_1.default.Schema({
    bidId: { type: String, unique: true },
    itemId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Item' },
    bidderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    bidAmount: { type: Number, required: true },
    bidTime: { type: Date, default: Date.now },
});
const Bid = mongoose_1.default.model('Bid', BidSchema);
exports.default = Bid;
