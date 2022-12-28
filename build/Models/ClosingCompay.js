"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Application_1 = __importDefault(require("./Application"));
const ClosingCompanySchema = new mongoose_1.Schema({
    appId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: Application_1.default,
        unique: true,
    },
    closingCompanyName: {
        type: String,
        required: true,
        maxlength: 200,
    },
    address: {
        type: String,
        required: true,
        maxlength: 200,
    },
    state: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 55,
    },
    contactName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    EscrowNumber: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
    },
    zipCode: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});
const ClosingCompany = (0, mongoose_1.model)("ClosingCompany", ClosingCompanySchema);
exports.default = ClosingCompany;
