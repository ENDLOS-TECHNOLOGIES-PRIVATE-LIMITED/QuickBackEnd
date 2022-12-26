import { Schema, model } from "mongoose";
import Application from "./Application";

interface BrokerType {
  appId: Schema.Types.ObjectId;
  address: String;
  state: String;
  phone: String;
  city: String;
  zipcode: String;
  email: String;
  borkerCompanyName: String;
  bFirstName: String;
  bLastName: String;
  bcellPhone: String;
  bemail: String;
}

const BrokerSchema = new Schema<BrokerType>({
  appId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Application,
    unique: true,
  },

  address: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15,
  },
  city: {
    type: String,
    required: true,
  },

  zipcode: {
    type: String,
    required: true,
  },

  email: {
    type: String,
  },
  borkerCompanyName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 95,
  },
  bFirstName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 65,
  },
  bLastName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 85,
  },
  bcellPhone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 25,
  },
  bemail: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 85,
  },
});
const Broker = model<BrokerType>("Broker", BrokerSchema);
export default Broker;
