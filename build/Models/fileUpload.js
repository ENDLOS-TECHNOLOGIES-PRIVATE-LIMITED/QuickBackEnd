"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Application_1 = __importDefault(require("./Application"));
const fileUploadSchema = new mongoose_1.Schema({
    appId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: Application_1.default,
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
const fileUpload = (0, mongoose_1.model)("fileUpload", fileUploadSchema);
exports.default = fileUpload;
