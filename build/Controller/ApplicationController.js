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
exports.Get = exports.All = exports.Edit = exports.Register = void 0;
const Agent_1 = __importDefault(require("../Models/Agent"));
const Application_1 = __importDefault(require("../Models/Application"));
const Banking_1 = __importDefault(require("../Models/Banking"));
const Broker_1 = __importDefault(require("../Models/Broker"));
const Client_1 = __importDefault(require("../Models/Client"));
const ClosingCompay_1 = __importDefault(require("../Models/ClosingCompay"));
const fileUpload_1 = __importDefault(require("../Models/fileUpload"));
const Property_1 = __importDefault(require("../Models/Property"));
const SaleConformation_1 = __importDefault(require("../Models/SaleConformation"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.user.id;
        // let customAppId = "QCA220914-1001";
        let customAppId;
        const genAppId = (id) => {
            let mydate = new Date();
            let month = mydate.getMonth() + 1;
            let year = mydate.getFullYear().toString().slice(2, 4);
            let date = mydate.getDate();
            let string = `QCA${year}${month}${date}-${id}`;
            return string;
        };
        const AllApps = yield Application_1.default.find({});
        if (AllApps.length > 0) {
            let inNumber = Number(AllApps[AllApps.length - 1].customAppId.split("-")[AllApps[AllApps.length - 1].customAppId.split("-").length - 1]) + 1;
            console.log(inNumber);
            customAppId = genAppId(inNumber);
        }
        else {
            customAppId = genAppId(1001);
        }
        // console.log({ customAppId });
        const RegisterdApplication = yield Application_1.default.create(Object.assign(Object.assign({}, req.body), { userid,
            customAppId }));
        //sending Application in User response
        if (RegisterdApplication) {
            res.json({
                message: " Application Successfully Registerd",
                data: { appId: RegisterdApplication._id },
                success: true,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.Register = Register;
const Edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, isCompleted, isClientCompleted, isSaleCompleted, isBrokerCompleted, isBankingCompleted, isDocumentUploaded, amount, status, } = req.body;
        const updatingApplication = {
            isCompleted,
            isClientCompleted,
            isSaleCompleted,
            isBrokerCompleted,
            isBankingCompleted,
            isDocumentUploaded,
            amount,
            status,
        };
        if (isCompleted) {
            updatingApplication.isCompleted = req.body.isCompleted;
        }
        if (isClientCompleted) {
            updatingApplication.isClientCompleted = req.body.isClientCompleted;
        }
        if (isSaleCompleted) {
            updatingApplication.isSaleCompleted = req.body.isSaleCompleted;
        }
        if (isBankingCompleted) {
            updatingApplication.isBankingCompleted = req.body.isBankingCompleted;
        }
        if (isDocumentUploaded) {
            updatingApplication.isDocumentUploaded = req.body.isDocumentUploaded;
        }
        if (amount) {
            updatingApplication.amount = req.body.amount;
        }
        if (status) {
            updatingApplication.status = req.body.status;
        }
        // const userid = req.user.id;
        //finding Application of the user by Userid
        // let userid: any = req.body.id;
        if (!id || id.length === 0 || id == null || id == "undefined") {
            res.json({
                message: " Please Provide a valid Userid  ",
                status: false,
            });
        }
        else {
            // const updatedApplication: any = await Application.findOneAndUpdate(
            //   { userid: `${req.body.userid}` },
            //   { $set: updatingApplication },
            //   { new: true }
            // );
            const updatedApplication = yield Application_1.default.findByIdAndUpdate(id, { $set: updatingApplication }, { new: true });
            // const findone: any = await Application.find({ userid });
            // console.log("finded one is ", findone);
            // console.log(" updated application is ", updatedApplication);
            if (updatedApplication.length == 0 || !updatedApplication) {
                return res.status(400).json({
                    error: "Application not found ",
                    success: false,
                });
            }
            else {
                //sending ClosingCompany details in response
                res.json({
                    message: " Application Updated Successfully ",
                    status: true,
                    data: updatedApplication,
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.Edit = Edit;
const All = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { userid } = req.body;
        const user = req.user;
        if (req.user.isAdmin === true) {
            //geting All Application from the Db
            const AllApplicatons = yield Application_1.default.find({});
            //Taking AppId form the All Applications and Storing in An Array
            const AppIdArry = AllApplicatons.map((element) => element._id.toString());
            const AllApplicationData = yield Promise.all(AppIdArry.map((appId) => __awaiter(void 0, void 0, void 0, function* () {
                const ApplicationDetails = yield Application_1.default.find({ _id: appId });
                const client = yield Client_1.default.find({ appId });
                const isSalesConformation = yield SaleConformation_1.default.find({
                    appId,
                });
                const PropertyDetails = yield Property_1.default.find({
                    appId,
                });
                const AgentDetails = yield Agent_1.default.find({
                    appId,
                });
                const ClosingCompanyDetails = yield ClosingCompay_1.default.find({
                    appId,
                });
                const BrokerDetails = yield Broker_1.default.find({
                    appId,
                });
                const BankingDetails = yield Banking_1.default.find({
                    appId,
                });
                // const doucmentDetails = await uploadDocument.find({
                //   appId,
                // });
                const doucmentDetails = yield fileUpload_1.default.find({
                    appId,
                });
                return {
                    ApplicationDetails: ApplicationDetails[0],
                    AgentDetails: AgentDetails[0],
                    PropertyDetails: PropertyDetails[0],
                    BankingDetails: BankingDetails[0],
                    client: client[0],
                    BrokerDetails: BrokerDetails[0],
                    isSalesConformation: isSalesConformation[0],
                    ClosingCompanyDetails: ClosingCompanyDetails[0],
                    Documents: doucmentDetails[0],
                };
            })));
            // console.log(AllApplicationData);
            res.json({
                message: "Data is fetched Successfully",
                success: true,
                data: AllApplicationData,
            });
        }
        else {
            res.json({
                message: "UnAuthorized",
                success: false,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.All = All;
const Get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { userid } = req.body;
        const user = req.user;
        // console.log("im your middleware data ", user);
        const userid = user.id;
        console.log(userid);
        // console.log(
        //   "custom id :",
        //   AllApps[AllApps.length - 1].customAppId.split("-")[
        //     AllApps[AllApps.length - 1].customAppId.split("-").length - 1
        //   ]
        // );
        // console.log("user in app controller", req);
        // console.log(userid);
        //finding Appllication
        const ApplicationInDb = yield Application_1.default.find({ userid });
        console.log(ApplicationInDb.length);
        if (ApplicationInDb.length == 0 || !ApplicationInDb) {
            return res.status(400).json({
                error: "Application not found ",
                success: false,
            });
        }
        //sending Appllication User response
        res.json({
            message: "fetched Successfully ",
            data: ApplicationInDb,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.Get = Get;
