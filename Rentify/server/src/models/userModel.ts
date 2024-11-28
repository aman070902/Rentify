import mongoose, { Schema, Document } from 'mongoose';

// Interface for the user model
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Define the schema for the user
const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export the User model
const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;

