import ClosingCompany, { ClosingCompanyType } from "./../Models/ClosingCompay";
import { Request, Response } from "express";
import { Schema, model } from "mongoose";

export const Register = async (req: Request, res: Response) => {
  try {
    const closingCompanyDetails = await ClosingCompany.create({
      ...req.body,
    });

    //sending ClosingCompany Details in response
    if (closingCompanyDetails) {
      res.json({
        message: "Closing Company details added Successfully",
        success: true,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const Get = async (req: Request, res: Response) => {
  try {
    const { appId } = req.body;

    //finding ClosingCompany Details from Db

    const ClosingCompanyInDb = await ClosingCompany.find({ appId });

    if (ClosingCompanyInDb.length == 0 || !ClosingCompanyInDb) {
      return res.status(400).json({
        error: "ClosingCompany Details not found ",
        success: false,
      });
    } else {
      //sending ClosingCompany details in response
      res.json({
        message: "fetched Successfully ",
        data: ClosingCompanyInDb,
        status: true,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const Edit = async (req: Request, res: Response) => {
  try {
    const {
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
    } = req.body;

    const updatingClosingCompany: ClosingCompanyType = {
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

    const updatedClosingCompany: any = await ClosingCompany.findOneAndUpdate(
      appId,
      { $set: updatingClosingCompany },
      { new: true }
    );

    if (updatedClosingCompany.length == 0 || !updatedClosingCompany) {
      return res.status(400).json({
        error: "ClosingCompany not found ",
        success: false,
      });
    } else {
      //sending ClosingCompany details in response
      res.json({
        message: "ClosingCompany Details Updated Successfully ",
        data: updatedClosingCompany,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
