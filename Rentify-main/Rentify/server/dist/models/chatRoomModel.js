"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ChatRoomSchema = new mongoose_1.default.Schema({
    chatRoomId: { type: String, unique: true },
    itemId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Item' },
    createdDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
});
const ChatRoom = mongoose_1.default.model('ChatRoom', ChatRoomSchema);
exports.default = ChatRoom;
