"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Application_1 = __importDefault(require("./Application"));
const BrokerSchema = new mongoose_1.Schema({
    appId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: Application_1.default,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15,
    },
    city: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    borkerCompanyName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 95,
    },
    bFirstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 65,
    },
    bLastName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 85,
    },
    bcellPhone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 25,
    },
    bemail: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 85,
    },
});
const Broker = (0, mongoose_1.model)("Broker", BrokerSchema);
exports.default = Broker;
