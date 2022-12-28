import { Schema, model } from "mongoose";
import Application from "./Application";

interface client {
  appId: Schema.Types.ObjectId;
  firstName: String;
  lastName: String;
  email: String;
  phone: String;
  HomeAddress: String;
  city: String;
  state: String;
  zipcode: String;
}

const ClientSchema = new Schema<client>({
  appId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Application,
    unique: true,
  },

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
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
  },
  HomeAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 65,
  },
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 65,
  },
  zipcode: {
    type: String,
    required: true,
    minlength: 5,

    maxlength: 12,
  },
});
const Client = model<client>("Client", ClientSchema);
export default Client;
