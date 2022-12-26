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
const Application_1 = __importDefault(require("../Models/Application"));
const Broker_1 = __importDefault(require("../Models/Broker"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myApplication = yield Application_1.default.find({});
        //Registering Employee in the Db
        const RegisterdBroker = yield Broker_1.default.create(Object.assign({}, req.body));
        //sending Registerd User response
        if (RegisterdBroker) {
            res.json({
                message: " Broker Successfully Registerd",
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
        //finding Broker in Db
        const BrokerInDb = yield Broker_1.default.find({ appId });
        if (BrokerInDb.length == 0 || !BrokerInDb) {
            return res.status(400).json({
                error: "Broker Details not found ",
                success: false,
            });
        }
        //sending Broker details in response
        res.json({
            message: "fetched Successfully ",
            data: BrokerInDb,
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.Get = Get;
const Edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appId, address, state, phone, city, zipcode, email, borkerCompanyName, bFirstName, bLastName, bcellPhone, bemail, } = req.body;
        const updatingBroker = {
            address,
            state,
            phone,
            city,
            zipcode,
            email,
            borkerCompanyName,
            bFirstName,
            bLastName,
            bcellPhone,
            bemail,
        };
        if (address) {
            updatingBroker.address = req.body.address;
        }
        if (state) {
            updatingBroker.state = req.body.state;
        }
        if (phone) {
            updatingBroker.phone = req.body.phone;
        }
        if (city) {
            updatingBroker.city = req.body.city;
        }
        if (zipcode) {
            updatingBroker.zipcode = req.body.zipcode;
        }
        if (email) {
            updatingBroker.email = req.body.email;
        }
        if (borkerCompanyName) {
            updatingBroker.borkerCompanyName = req.body.borkerCompanyName;
        }
        if (bFirstName) {
            updatingBroker.bFirstName = req.body.bFirstName;
        }
        if (bLastName) {
            updatingBroker.bLastName = req.body.bLastName;
        }
        if (bcellPhone) {
            updatingBroker.bcellPhone = req.body.bcellPhone;
        }
        if (bemail) {
            updatingBroker.bemail = req.body.bemail;
        }
        //finding Broker and updating
        const updatedBroker = yield Broker_1.default.findOneAndUpdate({ appId: `${req.body.appId}` }, { $set: updatingBroker }, { new: true });
        const find = yield Broker_1.default.findOne({ appId });
        console.log(updatedBroker);
        if (updatedBroker) {
            //sending Registerd User response
            res.json({
                message: " Broker Updated Successfully ",
                success: true,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.Edit = Edit;
