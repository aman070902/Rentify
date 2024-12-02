import express, { Request, Response } from "express";
import Chatroom from "../models/chatroomModel";

const router = express.Router();

// Create or join a chatroom
router.post("/create", async (req: Request, res: Response) => {
  try {
    const { itemId, userId } = req.body;

    // Check if chatroom exists for the item
    let chatroom = await Chatroom.findOne({ itemId });

    if (!chatroom) {
      // Create new chatroom
      chatroom = new Chatroom({ itemId, users: [userId] });
      await chatroom.save();
    } else if (!chatroom.users.includes(userId)) {
      // Add user to existing chatroom
      chatroom.users.push(userId);
      await chatroom.save();
    }

    res.status(200).json(chatroom);
  } catch (error) {
    res.status(500).json({ message: "Failed to create or join chatroom", error });
  }
});

// Fetch messages for a chatroom
router.get("/:chatroomId", async (req: Request, res: Response) => {
  try {
    const chatroom = await Chatroom.findById(req.params.chatroomId).populate("messages.sender");
    res.status(200).json(chatroom?.messages || []);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
});

// Add a message to chatroom
router.post("/:chatroomId/message", async (req: Request, res: Response) => {
  try {
    const { sender, content } = req.body;

    const chatroom = await Chatroom.findById(req.params.chatroomId);
    if (!chatroom) {
      return res.status(404).json({ message: "Chatroom not found" });
    }

    chatroom.messages.push({ sender, content });
    await chatroom.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
});

export default router;

