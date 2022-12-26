import { Schema, model } from "mongoose";
import Application from "./Application";

export interface ClosingCompanyType {
  appId: Schema.Types.ObjectId;
  closingCompanyName: String;
  address: String;
  state: String;
  contactName: String;
  phone: String;
  EscrowNumber: String;
  city: String;
  zipCode: String;
  email: string;
}

const ClosingCompanySchema = new Schema<ClosingCompanyType>({
  appId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Application,
    unique: true,
  },

  closingCompanyName: {
    type: String,
    required: true,

    maxlength: 200,
  },

  address: {
    type: String,
    required: true,

    maxlength: 200,
  },
  state: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 55,
  },

  contactName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  EscrowNumber: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  zipCode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const ClosingCompany = model<ClosingCompanyType>(
  "ClosingCompany",
  ClosingCompanySchema
);
export default ClosingCompany;
