"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Application_1 = __importDefault(require("./Application"));
const BankingSchema = new mongoose_1.Schema({
    appId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: Application_1.default,
        unique: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    accountHolder: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15,
    },
    accountType: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15,
    },
    accountNumber: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength: 25,
    },
    routing: {
        type: String,
        required: true,
    },
    isAddressSame: {
        type: Boolean,
        default: false,
    },
    statementAddress: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    zipCode: {
        type: String,
    },
});
const Banking = (0, mongoose_1.model)("Banking", BankingSchema);
exports.default = Banking;
