"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Application_1 = __importDefault(require("./Application"));
const AgentSchema = new mongoose_1.Schema({
    appId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: Application_1.default,
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
const Agent = (0, mongoose_1.model)("Agent", AgentSchema);
exports.default = Agent;
