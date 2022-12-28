"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Application_1 = __importDefault(require("./Application"));
const ClientSchema = new mongoose_1.Schema({
    appId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: Application_1.default,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
    },
    HomeAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 65,
    },
    state: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 65,
    },
    zipcode: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 12,
    },
});
const Client = (0, mongoose_1.model)("Client", ClientSchema);
exports.default = Client;
