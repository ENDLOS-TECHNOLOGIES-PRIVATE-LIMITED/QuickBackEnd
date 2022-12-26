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
const uploadDocument_1 = __importDefault(require("../Models/uploadDocument"));
const fs = require("fs");
const path = require("path");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appId } = req.body;
        // console.log("appId", "appId");
        // console.log("appId", appId);
        // console.log(
        //   "checking the path",
        //   path.join(__dirname, "../", "/uploads/" + req.files[0].filename)
        // );
        // console.log(
        //   "checking the path",
        //   path.join(__dirname, "../", "/uploads/" + req.files[1].filename)
        // );
        // console.log(
        //   "checking the path",
        //   path.join(__dirname, "../", "/uploads/" + req.files[2].filename)
        // );
        // console.log(
        //   "checking the path",
        //   path.join(__dirname, "../", "/uploads/" + req.files[3].filename)
        // );
        // console.log(
        //   "checking the path",
        //   path.join(__dirname, "../", "/uploads/" + req.files[4].filename)
        // );
        // console.log(
        //   "checking the path",
        //   path.join(__dirname, "../", "/uploads/" + req.files[5].filename)
        // );
        // console.log(
        //   "checking the path",
        //   path.join(__dirname, "../", "/uploads/" + req.files[6].filename)
        // );
        // console.log(req.files);
        const DocumentsInTheDb = yield uploadDocument_1.default.create({
            appId,
            purchaseAgrement: {
                data: fs.readFileSync(path.join(__dirname, "../", "/uploads/" + req.files[0].filename)),
            },
            brokerOfRecord: {
                data: fs.readFileSync(path.join(__dirname, "../", "/uploads/" + req.files[1].filename)),
                contentType: "image/png",
            },
            lmStatemntOrVoidCheck: {
                data: fs.readFileSync(path.join(__dirname, "../", "/uploads/" + req.files[2].filename)),
            },
            dLicence: {
                data: fs.readFileSync(path.join(__dirname, "../", "/uploads/" + req.files[3].filename)),
                contentType: "image/png",
            },
            pHistory: {
                data: fs.readFileSync(path.join(__dirname, "../", "/uploads/" + req.files[4].filename)),
                contentType: "image/png",
            },
            another: {
                data: fs.readFileSync(path.join(__dirname, "../", "/uploads/" + req.files[5].filename)),
                contentType: "image/png",
            },
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
        const DocumentsInDb = yield uploadDocument_1.default.find({ appId });
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
// export const Edit = async (req: Request, res: Response) => {
//   try {
//     const { appId } = req.body;
//     const updatingDoucments: any = {};
//     if (address) {
//       updatingProperty.address = req.body.address;
//     }
//     if (state) {
//       updatingProperty.state = req.body.state;
//     }
//     if (sellerName) {
//       updatingProperty.sellerName = req.body.sellerName;
//     }
//     if (finalSalesPrice) {
//       updatingProperty.finalSalesPrice = req.body.finalSalesPrice;
//     }
//     if (city) {
//       updatingProperty.city = req.body.city;
//     }
//     if (zipcode) {
//       updatingProperty.zipcode = req.body.zipcode;
//     }
//     if (buyerName) {
//       updatingProperty.buyerName = req.body.buyerName;
//     }
//     if (ClosingDate) {
//       updatingProperty.ClosingDate = req.body.ClosingDate;
//     }
//     if (isShortSale) {
//       updatingProperty.isShortSale = req.body.isShortSale;
//     }
//     //finding Application of the user by Userid
//     const updatedProperty: any = await Property.findOneAndUpdate(
//       appId,
//       { $set: updatingProperty },
//       { new: true }
//     );
//     if (
//       updatedProperty == null ||
//       updatedProperty.length == 0 ||
//       !updatedProperty
//     ) {
//       return res.status(400).json({
//         error: "Property not found ",
//         success: false,
//       });
//     } else {
//       //sending Banking details in response
//       res.json({
//         message: "Property Details Updated Successfully ",
//         success: true,
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
