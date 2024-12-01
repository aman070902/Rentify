"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ItemSchema = new mongoose_1.default.Schema({
    itemId: { type: String, unique: true },
    ownerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    postDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Available' },
});
// Add a text index for efficient search on title and description
ItemSchema.index({ title: 'text', description: 'text' });
const Item = mongoose_1.default.model('Item', ItemSchema);
exports.default = Item;
