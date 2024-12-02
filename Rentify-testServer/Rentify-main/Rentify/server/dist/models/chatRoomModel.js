"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ChatroomSchema = new mongoose_1.default.Schema({
    itemId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Item", required: true },
    users: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true }],
    messages: [
        {
            sender: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
            content: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});
const Chatroom = mongoose_1.default.model("Chatroom", ChatroomSchema);
exports.default = Chatroom;
