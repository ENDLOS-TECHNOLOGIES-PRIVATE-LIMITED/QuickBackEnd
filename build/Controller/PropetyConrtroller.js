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
const Property_1 = __importDefault(require("../Models/Property"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AddedPropety = yield Property_1.default.create(Object.assign({}, req.body));
        if (AddedPropety) {
            res.json({
                message: " Property Details Added Successfully  ",
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
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.Register = Register;
const Get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appId } = req.body;
        const PropertyInDb = yield Property_1.default.find({ appId });
        if (PropertyInDb == null || PropertyInDb.length == 0 || !PropertyInDb) {
            return res.status(400).json({
                error: "SaleConformation details  not found ",
                success: false,
            });
        }
        else {
            res.json({
                message: "Details fetched Successfully ",
                data: PropertyInDb,
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
        const { appId, address, state, sellerName, finalSalesPrice, city, zipcode, buyerName, ClosingDate, isShortSale, } = req.body;
        const updatingProperty = {
            appId,
            address,
            state,
            sellerName,
            finalSalesPrice,
            city,
            zipcode,
            buyerName,
            ClosingDate,
            isShortSale,
        };
        if (address) {
            updatingProperty.address = req.body.address;
        }
        if (state) {
            updatingProperty.state = req.body.state;
        }
        if (sellerName) {
            updatingProperty.sellerName = req.body.sellerName;
        }
        if (finalSalesPrice) {
            updatingProperty.finalSalesPrice = req.body.finalSalesPrice;
        }
        if (city) {
            updatingProperty.city = req.body.city;
        }
        if (zipcode) {
            updatingProperty.zipcode = req.body.zipcode;
        }
        if (buyerName) {
            updatingProperty.buyerName = req.body.buyerName;
        }
        if (ClosingDate) {
            updatingProperty.ClosingDate = req.body.ClosingDate;
        }
        if (isShortSale) {
            updatingProperty.isShortSale = req.body.isShortSale;
        }
        //finding Application of the user by Userid
        const updatedProperty = yield Property_1.default.findOneAndUpdate(appId, { $set: updatingProperty }, { new: true });
        if (updatedProperty == null ||
            updatedProperty.length == 0 ||
            !updatedProperty) {
            return res.status(400).json({
                error: "Property not found ",
                success: false,
            });
        }
        else {
            //sending Banking details in response
            res.json({
                message: "Property Details Updated Successfully ",
                success: true,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.Edit = Edit;
