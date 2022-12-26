"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const USERNAME = process.env.MYUSERNAME || '';
const PASSWORD = process.env.PASSWORD || '';
const DATABASENAME = process.env.DATABASENAME || '';
const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.bulhrac.mongodb.net/${DATABASENAME}?retryWrites=true&w=majority`;
const PORT = 3000;
const config = {
    MONGO_URI,
    PORT
};
exports.default = config;
