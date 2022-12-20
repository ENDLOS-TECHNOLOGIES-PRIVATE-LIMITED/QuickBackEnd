import { Request, Response } from "express";
import { Schema, model } from "mongoose";
import Application from "../Models/Application";
import Broker from "../Models/Broker";

export const Register = async (req: Request, res: Response) => {
  try {
    const myApplication = await Application.find({});

    //Registering Employee in the Db
    const RegisterdBroker = await Broker.create({
      ...req.body,
    });

    //sending Registerd User response
    if (RegisterdBroker) {
      res.json({
        message: " Broker Successfully Registerd",
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

    //finding Broker in Db

    const BrokerInDb = await Broker.find({ appId });

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
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};
export const Edit = async (req: Request, res: Response) => {
  try {
    const {
      appId,
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
    } = req.body;

    interface BrokerType {
      address: String;
      state: String;
      phone: number;
      city: String;
      zipcode: number;
      email: String;
      borkerCompanyName: String;
      bFirstName: String;
      bLastName: String;
      bcellPhone: number;
      bemail: String;
    }

    const updatingBroker: BrokerType = {
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

    const updatedBroker = await Broker.findOneAndUpdate(
      { appId: `${req.body.appId}` },
      { $set: updatingBroker },
      { new: true }
    );

    const find = await Broker.findOne({ appId });

    console.log(updatedBroker);

    if (updatedBroker) {
      //sending Registerd User response
      res.json({
        message: " Broker Updated Successfully ",
        success: true,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};
