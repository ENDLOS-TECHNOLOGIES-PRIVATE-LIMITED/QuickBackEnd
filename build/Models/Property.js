"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Application_1 = __importDefault(require("./Application"));
const PropertySchema = new mongoose_1.Schema({
    appId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: Application_1.default,
        unique: true,
    },
    address: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 65,
    },
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 65,
    },
    sellerName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 65,
    },
    finalSalesPrice: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 35,
    },
    city: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    buyerName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 65,
    },
    ClosingDate: {
        type: Date,
        required: true,
    },
    isShortSale: {
        type: Boolean,
        required: true,
        default: false,
    },
});
const Property = (0, mongoose_1.model)("Property", PropertySchema);
exports.default = Property;
