import { Schema, model } from "mongoose";
import User from "./User";

export interface ApplicationType {
  userid: Schema.Types.ObjectId;
  isCreated: Date;
  //   isCompleted: Date;
  isCompleted: {
    date: Date;
    iscomplete: boolean;
  };
  isClientCompleted: boolean;
  isSaleCompleted: boolean;
  isBrokerCompleted: boolean;
  isBankingCompleted: boolean;
  isDocumentUploaded: boolean;
  status: {
    isApproved: boolean;
    isRejected: {
      isRejected: boolean;
      Reason: String;
    };
    isPending: boolean;
  };
  amount: String;
  isAgreeTerms: "Yes" | "No";
}

const ApplicationSchema = new Schema<ApplicationType>({
  userid: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
    unique: true,
  },

  isCreated: {
    type: Date,
    default: Date.now(),
  },

  isCompleted: {
    date: {
      type: Date,
    },
    iscomplete: {
      type: Boolean,
      default: false,
    },
  },
  isClientCompleted: {
    type: Boolean,
    default: false,
  },
  isSaleCompleted: {
    type: Boolean,
    default: false,
  },
  isBrokerCompleted: {
    type: Boolean,
    default: false,
  },
  isBankingCompleted: {
    type: Boolean,
    default: false,
  },
  isDocumentUploaded: {
    type: Boolean,
    default: false,
  },
  status: {
    isApproved: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      isRejected: {
        type: Boolean,
        default: false,
      },
      Reason: {
        type: String,
      },
    },
    isPending: {
      type: Boolean,
      default: true,
    },
  },
  amount: {
    type: String,
    required: true,
  },
  isAgreeTerms: {
    type: String,
    default: "Yes",
  },
});
const Application = model<ApplicationType>("Application", ApplicationSchema);
export default Application;
