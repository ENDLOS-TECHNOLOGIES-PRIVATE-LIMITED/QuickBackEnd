"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = exports.Register = void 0;
const fileUpload_1 = __importDefault(require("../Models/fileUpload"));
const fs = require("fs");
const path = require("path");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appId } = req.body;
        console.log(appId);
        console.log(req.files);
        const DocumentsInTheDb = yield fileUpload_1.default.create({
            appId,
            purchaseAgrement: req.files[0].filename,
            brokerOfRecord: req.files[1].filename,
            lmStatemntOrVoidCheck: req.files[2].filename,
            dLicence: req.files[3].filename,
            pHistory: req.files[4].filename,
            another: req.files[5].filename,
        });
        console.log("DocumentsInTheDb", DocumentsInTheDb);
        if (DocumentsInTheDb) {
            res.json({
                message: " Documents Added Successfully  ",
                success: true,
            });
        }
        else {
            return res.status(400).json({
                error: "Property Not Added",
                success: false,
            });
        }
        // res.json({ message: "you don't know about me " });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.Register = Register;
const Get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appId } = req.body;
        const DocumentsInDb = yield fileUpload_1.default.find({ appId });
        if (DocumentsInDb == null || DocumentsInDb.length == 0 || !DocumentsInDb) {
            return res.status(400).json({
                error: "Documents not found ",
                success: false,
            });
        }
        else {
            res.json({
                message: "Documents fetched Successfully ",
                data: DocumentsInDb,
                success: true,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.Get = Get;
