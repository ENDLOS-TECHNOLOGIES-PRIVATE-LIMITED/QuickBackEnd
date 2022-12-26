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
const ClosingCompay_1 = __importDefault(require("./../Models/ClosingCompay"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const closingCompanyDetails = yield ClosingCompay_1.default.create(Object.assign({}, req.body));
        //sending ClosingCompany Details in response
        if (closingCompanyDetails) {
            res.json({
                message: "Closing Company details added Successfully",
                success: true,
            });
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
        //finding ClosingCompany Details from Db
        const ClosingCompanyInDb = yield ClosingCompay_1.default.find({ appId });
        if (ClosingCompanyInDb.length == 0 || !ClosingCompanyInDb) {
            return res.status(400).json({
                error: "ClosingCompany Details not found ",
                success: false,
            });
        }
        else {
            //sending ClosingCompany details in response
            res.json({
                message: "fetched Successfully ",
                data: ClosingCompanyInDb,
                status: true,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.Get = Get;
const Edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appId, closingCompanyName, address, state, contactName, phone, EscrowNumber, city, zipCode, email, } = req.body;
        const updatingClosingCompany = {
            appId,
            closingCompanyName,
            address,
            state,
            contactName,
            phone,
            EscrowNumber,
            city,
            zipCode,
            email,
        };
        if (closingCompanyName) {
            updatingClosingCompany.closingCompanyName = req.body.closingCompanyName;
        }
        if (address) {
            updatingClosingCompany.address = req.body.address;
        }
        if (state) {
            updatingClosingCompany.state = req.body.state;
        }
        if (contactName) {
            updatingClosingCompany.contactName = req.body.contactName;
        }
        if (phone) {
            updatingClosingCompany.phone = req.body.phone;
        }
        if (EscrowNumber) {
            updatingClosingCompany.EscrowNumber = req.body.EscrowNumber;
        }
        if (city) {
            updatingClosingCompany.city = req.body.city;
        }
        if (zipCode) {
            updatingClosingCompany.zipCode = req.body.zipCode;
        }
        if (city) {
            updatingClosingCompany.city = req.body.city;
        }
        if (email) {
            updatingClosingCompany.email = req.body.email;
        }
        const updatedClosingCompany = yield ClosingCompay_1.default.findOneAndUpdate(appId, { $set: updatingClosingCompany }, { new: true });
        if (updatedClosingCompany.length == 0 || !updatedClosingCompany) {
            return res.status(400).json({
                error: "ClosingCompany not found ",
                success: false,
            });
        }
        else {
            //sending ClosingCompany details in response
            res.json({
                message: "ClosingCompany Details Updated Successfully ",
                data: updatedClosingCompany,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.Edit = Edit;
