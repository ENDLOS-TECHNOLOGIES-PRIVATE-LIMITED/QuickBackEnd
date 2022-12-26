"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Application_1 = __importDefault(require("./Application"));
const SaleConformationSchema = new mongoose_1.Schema({
    appId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: Application_1.default,
        unique: true,
    },
    isBroker: {
        type: Boolean,
        required: true,
        default: false,
    },
    isTakenAdvance: {
        type: Boolean,
        required: true,
        default: false,
    },
});
const SaleConformation = (0, mongoose_1.model)("SaleConformation", SaleConformationSchema);
exports.default = SaleConformation;
