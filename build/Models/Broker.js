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
        required: true,
    },
    borkerCompanyName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 35,
    },
    bFirstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15,
    },
    bLastName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15,
    },
    bcellPhone: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15,
    },
    bemail: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 25,
    },
});
const Broker = (0, mongoose_1.model)("Broker", BrokerSchema);
exports.default = Broker;
