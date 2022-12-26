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
const Client_1 = __importDefault(require("../Models/Client"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Destructuring data from request
        const { firstName, lastName, email, password } = req.body;
        // let isClientRegisterd = await Client.findOne({ email });
        // if (isClientRegisterd) {
        //   return res.status(400).json({ error: "Client email is already registerd" });
        // }
        //Registering Employee in the Db
        const RegisterdClient = yield Client_1.default.create(Object.assign({}, req.body));
        //sending Registerd User response
        res.json({
            message: " Client Successfully Registerd",
        });
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
        const ClientInDb = yield Client_1.default.find({ appId });
        if (ClientInDb) {
            //sending Registerd User response
            res.json({
                message: "fetched Successfully ",
                data: ClientInDb,
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
        const { appId, firstName, lastName, email, phone, HomeAddress, city, state, zipcode, } = req.body;
        const updatingClient = {
            firstName,
            lastName,
            email,
            phone,
            HomeAddress,
            city,
            state,
            zipcode,
        };
        if (firstName) {
            updatingClient.firstName = req.body.firstName;
        }
        if (lastName) {
            updatingClient.lastName = req.body.lastName;
        }
        if (email) {
            updatingClient.email = req.body.email;
        }
        if (phone) {
            updatingClient.phone = req.body.phone;
        }
        if (HomeAddress) {
            updatingClient.HomeAddress = req.body.HomeAddress;
        }
        if (city) {
            updatingClient.city = req.body.city;
        }
        if (state) {
            updatingClient.state = req.body.state;
        }
        if (zipcode) {
            updatingClient.zipcode = req.body.zipcode;
        }
        //finding Application of the user by Userid
        const updatedClient = yield Client_1.default.findByIdAndUpdate(appId, { $set: updatingClient }, { new: true });
        if (updatedClient) {
            //sending Registerd User response
            res.json({
                message: " Client Updated Successfully ",
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.Edit = Edit;
