"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Application_1 = __importDefault(require("./Application"));
const uploadDocumentSchema = new mongoose_1.Schema({
    appId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: Application_1.default,
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
const uploadDocument = (0, mongoose_1.model)("uploadDocument", uploadDocumentSchema);
exports.default = uploadDocument;
