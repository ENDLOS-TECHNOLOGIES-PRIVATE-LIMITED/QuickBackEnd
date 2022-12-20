import { Schema, model } from "mongoose";
import Application from "./Application";

export interface SaleConformationTypes {
  appId: Schema.Types.ObjectId;
  isBroker: boolean;
  isTakenAdvance: boolean;
}

const SaleConformationSchema = new Schema<SaleConformationTypes>({
  appId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Application,
    unique: true,
  },

  isBroker: {
    type: Boolean,
    required: true,
    default: false,
  },

  isTakenAdvance: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const SaleConformation = model<SaleConformationTypes>(
  "SaleConformation",
  SaleConformationSchema
);
export default SaleConformation;
