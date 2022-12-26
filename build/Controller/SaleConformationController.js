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
exports.Edit = exports.Get = exports.Register = void 0;
const SaleConformation_1 = __importDefault(require("../Models/SaleConformation"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saleconformInDb = yield SaleConformation_1.default.create(Object.assign({}, req.body));
        if (saleconformInDb) {
            res.json({
                message: " Successfully Added Conformation",
            });
        }
        else {
            return res.status(400).json({
                error: "Not Added",
                success: false,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.Register = Register;
const Get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appId } = req.body;
        //finding Broker
        const SaleConInDb = yield SaleConformation_1.default.find({ appId });
        if (SaleConInDb == null || SaleConInDb.length == 0 || !SaleConInDb) {
            return res.status(400).json({
                error: "SaleConformation details  not found ",
                success: false,
            });
        }
        else {
            res.json({
                message: "Details fetched Successfully ",
                data: SaleConInDb,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.Get = Get;
const Edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appId, isBroker, isTakenAdvance } = req.body;
        const updatingSaleConformation = {
            appId,
            isBroker,
            isTakenAdvance,
        };
        if (isBroker) {
            updatingSaleConformation.isBroker = req.body.isBroker;
        }
        if (isTakenAdvance) {
            updatingSaleConformation.isTakenAdvance = req.body.isTakenAdvance;
        }
        //finding Application of the user by Userid
        const updatedSconform = yield SaleConformation_1.default.findOneAndUpdate(appId, { $set: updatingSaleConformation }, { new: true });
        console.log(updatedSconform);
        if (updatedSconform == null ||
            updatedSconform.length == 0 ||
            !updatedSconform) {
            return res.status(400).json({
                error: "SaleConformation not found ",
                success: false,
            });
        }
        else {
            //sending Banking details in response
            res.json({
                message: "SaleConformation Details Updated Successfully ",
                success: true,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.Edit = Edit;
