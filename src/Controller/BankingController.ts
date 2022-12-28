import { Request, Response } from "express";
import { Schema, model } from "mongoose";
import Banking from "../Models/Banking";
import { BankingType } from "../Models/Banking";

export const Register = async (req: Request, res: Response) => {
  try {
    //Registering Employee in the Db
    const RegisterdBankingDetails = await Banking.create({
      ...req.body,
    });

    //sending Registerd User response
    if (RegisterdBankingDetails) {
      res.json({
        message: "Banking details added Successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const Get = async (req: Request, res: Response) => {
  try {
    const { appId } = req.body;

    //finding Banking Details from Db

    const BankingDetailsInDb = await Banking.find({ appId });

    if (BankingDetailsInDb.length == 0 || !BankingDetailsInDb) {
      return res.status(400).json({
        error: "Broker Details not found ",
        success: false,
      });
    } else {
      //sending Banking details in response
      res.json({
        message: "fetched Successfully ",
        data: BankingDetailsInDb,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const Edit = async (req: Request, res: Response) => {
  try {
    const {
      appId,
      bankName,

      bankPhone,
      bankAddress,
      bankCity,
      bankState,
      bankZipcode,

      accountHolder,
      accountType,
      accountNumber,
      routing,
      isAddressSame,
      statementAddress,
      state,
      city,
      zipCode,
    } = req.body;

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

    const updatingBanking: BankingType = {
      appId,
      bankName,

      bankPhone,
      bankAddress,
      bankCity,
      bankState,
      bankZipcode,
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
    if (bankPhone) {
      updatingBanking.bankPhone = req.body.bankPhone;
    }
    if (bankAddress) {
      updatingBanking.bankAddress = req.body.bankAddress;
    }
    if (bankCity) {
      updatingBanking.bankCity = req.body.bankCity;
    }
    if (bankState) {
      updatingBanking.bankState = req.body.bankState;
    }
    if (bankZipcode) {
      updatingBanking.bankZipcode = req.body.bankZipcode;
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

    const updatedBanking: any = await Banking.findOneAndUpdate(
      appId,
      { $set: updatingBanking },
      { new: true }
    );

    if (updatedBanking.length == 0 || !updatedBanking) {
      return res.status(400).json({
        error: "Application not found ",
        success: false,
      });
    } else {
      //sending Banking details in response
      res.json({
        message: "Banking Details Updated Successfully ",
        data: updatedBanking,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
