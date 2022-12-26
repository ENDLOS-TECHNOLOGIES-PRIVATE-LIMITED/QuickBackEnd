import { Schema, model } from "mongoose";
import Application from "./Application";

export interface BankingType {
  appId: Schema.Types.ObjectId;
  bankName: String;
  accountHolder: String;
  accountType: String;
  accountNumber: number;
  routing: string;
  isAddressSame: boolean;
  statementAddress: String;
  state: String;
  city: String;
  zipCode: String;
}

const BankingSchema = new Schema<BankingType>({
  appId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Application,
    unique: true,
  },

  bankName: {
    type: String,
    required: [true, "Please Enter Bank Name"],
  },
  accountHolder: {
    type: String,
    required: [true, "Please Enter Account Holder Name"],
    minlength: [
      2,
      "Account Holder Name Should Not Be Shorter Then 4 Characters",
    ],
    maxlength: [
      50,
      "Account Holder Name Maximum length Should'nt be More then 40 Characters",
    ],
  },
  accountType: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 45,
  },
  accountNumber: {
    type: Number,
    required: true,
    minlength: 6,
    maxlength: 45,
  },
  routing: {
    type: String,
    required: true,
  },
  isAddressSame: {
    type: Boolean,
    default: false,
  },
  statementAddress: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: String,
  },
});
const Banking = model<BankingType>("Banking", BankingSchema);
export default Banking;
