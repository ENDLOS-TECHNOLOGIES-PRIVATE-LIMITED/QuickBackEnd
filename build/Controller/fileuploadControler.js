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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const { appId } = req.body;
        if (req.files.length < 4) {
            throw new Error("Please Select Required Files");
        }
        else if (req.files.length == 4) {
            const DocumentsInTheDb = yield fileUpload_1.default.create({
                appId,
                purchaseAgrement: (_a = req.files[0]) === null || _a === void 0 ? void 0 : _a.filename,
                brokerOfRecord: (_b = req.files[1]) === null || _b === void 0 ? void 0 : _b.filename,
                lmStatemntOrVoidCheck: (_c = req.files[2]) === null || _c === void 0 ? void 0 : _c.filename,
                dLicence: req.files[3].filename,
            });
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
        }
        else if (req.files.length == 5) {
            const DocumentsInTheDb = yield fileUpload_1.default.create({
                appId,
                purchaseAgrement: (_d = req.files[0]) === null || _d === void 0 ? void 0 : _d.filename,
                brokerOfRecord: (_e = req.files[1]) === null || _e === void 0 ? void 0 : _e.filename,
                lmStatemntOrVoidCheck: (_f = req.files[2]) === null || _f === void 0 ? void 0 : _f.filename,
                dLicence: req.files[3].filename,
                pHistory: req.files[4].filename,
            });
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
        }
        else {
            const DocumentsInTheDb = yield fileUpload_1.default.create({
                appId,
                purchaseAgrement: (_g = req.files[0]) === null || _g === void 0 ? void 0 : _g.filename,
                brokerOfRecord: (_h = req.files[1]) === null || _h === void 0 ? void 0 : _h.filename,
                lmStatemntOrVoidCheck: (_j = req.files[2]) === null || _j === void 0 ? void 0 : _j.filename,
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
        }
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
