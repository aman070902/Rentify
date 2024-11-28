import mongoose from 'mongoose';

const ChatRoomSchema = new mongoose.Schema({
  chatRoomId: { type: String, unique: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  createdDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);
export default ChatRoom;

