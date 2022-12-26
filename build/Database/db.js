"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
const config_1 = __importDefault(require("../config/config"));
const mongoose_1 = require("mongoose");
const connectToMongo = () => {
    (0, mongoose_1.connect)(config_1.default.MONGO_URI).then(() => console.log(' connected with db successfully'))
        .catch(error => console.log(error.message));
};
exports.connectToMongo = connectToMongo;
