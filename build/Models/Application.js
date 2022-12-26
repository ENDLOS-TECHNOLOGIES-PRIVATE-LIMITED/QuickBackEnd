"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User_1 = __importDefault(require("./User"));
// userid: {
//   type: Schema.Types.ObjectId,
//   ref: User,
//   required: true,
// },
const ApplicationSchema = new mongoose_1.Schema({
    userid: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: User_1.default,
        unique: false,
    },
    customAppId: {
        type: String,
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
const Application = (0, mongoose_1.model)("Application", ApplicationSchema);
exports.default = Application;
