import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  id: Schema.Types.ObjectId;
  username: string;
  password: string;
  score: number;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);

export default User;
