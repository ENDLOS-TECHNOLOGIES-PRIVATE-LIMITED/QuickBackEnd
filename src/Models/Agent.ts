import { Schema, model } from "mongoose";
import Application from "./Application";

export interface AgentType {
  appId: Schema.Types.ObjectId;
  netCommission?: number;
  typeOfAgent?: {
    isListing?: boolean;
    isSelling?: boolean;
  };

  totalTransactions: number;
  pendingTransactions: number;
  nonPendingListing: number;
}

const AgentSchema = new Schema<AgentType>({
  appId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Application,
    unique: true,
  },

  netCommission: {
    type: Number,
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
    type: Number,
    required: true,
  },
  pendingTransactions: {
    type: Number,
    required: true,
  },
  nonPendingListing: {
    type: Number,
    required: true,
  },
});
const Agent = model<AgentType>("Agent", AgentSchema);
export default Agent;
