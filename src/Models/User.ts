import { Schema, model } from "mongoose";

interface usertype {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  isAdmin: boolean;
}

const UserSchema = new Schema<usertype>({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
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
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const User = model<usertype>("User", UserSchema);
export default User;
