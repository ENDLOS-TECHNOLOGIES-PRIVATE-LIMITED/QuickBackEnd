import { Schema, model } from "mongoose";
import Application from "./Application";

// export interface uploadDocumentType {
//   appId: Schema.Types.ObjectId;
//   // purchaseAgrement: string;
//   // brokerOfRecord: string;

//   purchaseAgrement: Buffer;
//   brokerOfRecord: Buffer;

//   // profileImage: {
//   //   data: Buffer;
//   //   contentType: String;
//   // };

//   //   bankName: String;
//   //   accountHolder: String;
//   //   accountType: String;
//   //   accountNumber: number;
//   //   routing: string;
//   //   isAddressSame: boolean;
//   //   statementAddress: String;
//   //   state: String;
//   //   city: String;
//   //   zipCode: number;
// }

export interface uploadDocumentType {
  appId: Schema.Types.ObjectId;
  purchaseAgrement: Buffer;
  brokerOfRecord: Buffer;
  lmStatemntOrVoidCheck: Buffer;
  dLicence: Buffer;
  pHistory: Buffer;
  another: Buffer;
}

const uploadDocumentSchema = new Schema<uploadDocumentType>({
  appId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Application,
    unique: true,
  },
  purchaseAgrement: {
    data: Buffer,
    contentType: String,
  },
  brokerOfRecord: {
    data: Buffer,
    contentType: String,
  },
  lmStatemntOrVoidCheck: {
    data: Buffer,
    contentType: String,
  },
  dLicence: {
    data: Buffer,
    contentType: String,
  },
  pHistory: {
    data: Buffer,
    contentType: String,
  },
  another: {
    data: Buffer,
    contentType: String,
  },
});
const uploadDocument = model<uploadDocumentType>(
  "uploadDocument",
  uploadDocumentSchema
);
export default uploadDocument;
