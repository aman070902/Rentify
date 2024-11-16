import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  participants: string[];
  messages: { sender: string; content: string; timestamp: Date }[];
}

const chatSchema: Schema = new Schema({
  participants: [{ type: String, required: true }],
  messages: [
    {
      sender: { type: String, required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model<IChat>('Chat', chatSchema);

export default Chat;

