import { Schema, model } from "mongoose";
import Application from "./Application";

export interface AgentType {
  appId: Schema.Types.ObjectId;
  netCommission?: number;
  typeOfAgent?: {
    isListing?: boolean;
    isSelling?: boolean;
  };

  totalTransactions: String;
  pendingTransactions: String;
  nonPendingListing: String;
}

const AgentSchema = new Schema<AgentType>({
  appId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Application,
    unique: true,
  },

  netCommission: {
    type: String,
    required: true,
  },
  typeOfAgent: {
    isListing: {
      type: Boolean,
      required: true,
    },
    isSelling: {
      type: Boolean,
      required: true,
    },
  },

  totalTransactions: {
    type: String,
    required: true,
  },
  pendingTransactions: {
    type: String,
    required: true,
  },
  nonPendingListing: {
    type: String,
    required: true,
  },
});
const Agent = model<AgentType>("Agent", AgentSchema);
export default Agent;
