"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatroomModel_1 = __importDefault(require("../models/chatroomModel"));
const router = express_1.default.Router();
// Create or join a chatroom
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId, userId } = req.body;
        // Check if chatroom exists for the item
        let chatroom = yield chatroomModel_1.default.findOne({ itemId });
        if (!chatroom) {
            // Create new chatroom
            chatroom = new chatroomModel_1.default({ itemId, users: [userId] });
            yield chatroom.save();
        }
        else if (!chatroom.users.includes(userId)) {
            // Add user to existing chatroom
            chatroom.users.push(userId);
            yield chatroom.save();
        }
        res.status(200).json(chatroom);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create or join chatroom", error });
    }
}));
// Fetch messages for a chatroom
router.get("/:chatroomId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatroom = yield chatroomModel_1.default.findById(req.params.chatroomId).populate("messages.sender");
        res.status(200).json((chatroom === null || chatroom === void 0 ? void 0 : chatroom.messages) || []);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch messages", error });
    }
}));
// Add a message to chatroom
router.post("/:chatroomId/message", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender, content } = req.body;
        const chatroom = yield chatroomModel_1.default.findById(req.params.chatroomId);
        if (!chatroom) {
            return res.status(404).json({ message: "Chatroom not found" });
        }
        chatroom.messages.push({ sender, content });
        yield chatroom.save();
        res.status(201).json({ message: "Message sent successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to send message", error });
    }
}));
exports.default = router;
