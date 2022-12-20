import { Schema, model } from "mongoose";
import Application from "./Application";

export interface fileUploadType {
  appId: Schema.Types.ObjectId;
  purchaseAgrement: string;
  brokerOfRecord: string;
  lmStatemntOrVoidCheck: string;
  dLicence: string;
  pHistory: string;
  another: string;
}

const fileUploadSchema = new Schema<fileUploadType>({
  appId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Application,
    unique: true,
  },
  purchaseAgrement: {
    type: String,
  },
  brokerOfRecord: {
    type: String,
  },
  lmStatemntOrVoidCheck: {
    type: String,
  },
  dLicence: {
    type: String,
  },
  pHistory: {
    type: String,
  },
  another: {
    type: String,
  },
});
const fileUpload = model<fileUploadType>("fileUpload", fileUploadSchema);
export default fileUpload;
