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
const Banking_1 = __importDefault(require("../Models/Banking"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Registering Employee in the Db
        const RegisterdBankingDetails = yield Banking_1.default.create(Object.assign({}, req.body));
        //sending Registerd User response
        if (RegisterdBankingDetails) {
            res.json({
                message: "Banking details added Successfully",
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
        //finding Banking Details from Db
        const BankingDetailsInDb = yield Banking_1.default.find({ appId });
        if (BankingDetailsInDb.length == 0 || !BankingDetailsInDb) {
            return res.status(400).json({
                error: "Broker Details not found ",
                success: false,
            });
        }
        else {
            //sending Banking details in response
            res.json({
                message: "fetched Successfully ",
                data: BankingDetailsInDb,
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
        const { appId, bankName, accountHolder, accountType, accountNumber, routing, isAddressSame, statementAddress, state, city, zipCode, } = req.body;
        // interface BrokerType {
        //   address: String;
        //   state: String;
        //   phone: number;
        //   city: String;
        //   zipcode: number;
        //   email: String;
        //   borkerCompanyName: String;
        //   bFirstName: String;
        //   bLastName: String;
        //   bcellPhone: number;
        //   bemail: String;
        // }
        const updatingBanking = {
            appId,
            bankName,
            accountHolder,
            accountType,
            accountNumber,
            routing,
            isAddressSame,
            statementAddress,
            state,
            city,
            zipCode,
        };
        if (bankName) {
            updatingBanking.bankName = req.body.bankName;
        }
        if (accountHolder) {
            updatingBanking.accountHolder = req.body.accountHolder;
        }
        if (accountType) {
            updatingBanking.accountType = req.body.accountType;
        }
        if (accountNumber) {
            updatingBanking.accountNumber = req.body.accountNumber;
        }
        if (routing) {
            updatingBanking.routing = req.body.routing;
        }
        if (isAddressSame) {
            updatingBanking.isAddressSame = req.body.isAddressSame;
        }
        if (statementAddress) {
            updatingBanking.statementAddress = req.body.statementAddress;
        }
        if (state) {
            updatingBanking.state = req.body.state;
        }
        if (city) {
            updatingBanking.city = req.body.city;
        }
        if (zipCode) {
            updatingBanking.zipCode = req.body.zipCode;
        }
        // R&D work
        // let myobj: any = {};
        // if (Object.keys(req.body)) {
        // }
        // Object.entries(req.body).map((item) => {
        //   // myobj.item[0] = item[1];
        //   //   myobj.item[0] = item[1];
        //   console.log(typeof item[0]);
        //   console.log(item[0]);
        //   //   Object.defineProperty(myobj, item[0], {
        //   //     item[1],
        //   //   });
        //   //   console.log(item);
        //   //   console.log(typeof item);
        //   //   console.log(item[0]);
        //   //   console.log(item[1]);
        //   //   console.log("object key :", Object.keys(item));
        //   //   console.log("object value :", Object.values(item));
        // });
        // console.log(myobj);
        // const data = req.body;
        // console.log(data);
        // data.map((e: any) => console.log(e));
        // req.body.map((element: any) => console.log(element));
        //finding Banking Details and updating
        const updatedBanking = yield Banking_1.default.findOneAndUpdate(appId, { $set: updatingBanking }, { new: true });
        if (updatedBanking.length == 0 || !updatedBanking) {
            return res.status(400).json({
                error: "Application not found ",
                success: false,
            });
        }
        else {
            //sending Banking details in response
            res.json({
                message: "Banking Details fetched Successfully ",
                data: updatedBanking,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.Edit = Edit;
