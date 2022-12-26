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
const Agent_1 = __importDefault(require("../Models/Agent"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AddedAgent = yield Agent_1.default.create(Object.assign({}, req.body));
        if (AddedAgent) {
            res.json({
                message: " Agent Details Added Successfully  ",
                success: true,
            });
        }
        else {
            return res.status(400).json({
                error: "Agent Not Added",
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
        const AgentInDb = yield Agent_1.default.find({ appId });
        if (AgentInDb == null || AgentInDb.length == 0 || !AgentInDb) {
            return res.status(400).json({
                error: "Agent details  not found ",
                success: false,
            });
        }
        else {
            res.json({
                message: "Agent Details fetched Successfully ",
                data: AgentInDb,
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
        const { appId, netCommission, typeOfAgent, totalTransactions, pendingTransactions, nonPendingListing, } = req.body;
        const updatingAgent = {
            appId,
            netCommission,
            typeOfAgent,
            totalTransactions,
            pendingTransactions,
            nonPendingListing,
        };
        if (netCommission) {
            totalTransactions.netCommission = req.body.netCommission;
        }
        if (typeOfAgent) {
            totalTransactions.typeOfAgent = req.body.typeOfAgent;
        }
        if (totalTransactions) {
            totalTransactions.totalTransactions = req.body.totalTransactions;
        }
        if (pendingTransactions) {
            totalTransactions.pendingTransactions = req.body.pendingTransactions;
        }
        if (nonPendingListing) {
            totalTransactions.nonPendingListing = req.body.nonPendingListing;
        }
        //finding Application of the user by Userid
        const updatedAgent = yield Agent_1.default.findOneAndUpdate(appId, { $set: updatingAgent }, { new: true });
        if (updatedAgent == null || updatedAgent.length == 0 || !updatedAgent) {
            return res.status(400).json({
                error: "Agent not found ",
                success: false,
            });
        }
        else {
            //sending Banking details in response
            res.json({
                message: "Agent Details Updated Successfully ",
                success: true,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.Edit = Edit;
