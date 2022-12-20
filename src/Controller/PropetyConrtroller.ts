import { Request, Response } from "express";
import Property, { PropertyType } from "../Models/Property";

export const Register = async (req: Request, res: Response) => {
  try {
    const AddedPropety = await Property.create({
      ...req.body,
    });
    if (AddedPropety) {
      res.json({
        message: " Property Details Added Successfully  ",
        success: true,
      });
    } else {
      return res.status(400).json({
        error: "Property Not Added",
        success: false,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const Get = async (req: Request, res: Response) => {
  try {
    const { appId } = req.body;

    const PropertyInDb = await Property.find({ appId });

    if (PropertyInDb == null || PropertyInDb.length == 0 || !PropertyInDb) {
      return res.status(400).json({
        error: "SaleConformation details  not found ",
        success: false,
      });
    } else {
      res.json({
        message: "Details fetched Successfully ",
        data: PropertyInDb,
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
      address,
      state,
      sellerName,
      finalSalesPrice,
      city,
      zipcode,
      buyerName,
      ClosingDate,
      isShortSale,
    } = req.body;

    const updatingProperty: PropertyType = {
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

    const updatedProperty: any = await Property.findOneAndUpdate(
      appId,
      { $set: updatingProperty },
      { new: true }
    );

    if (
      updatedProperty == null ||
      updatedProperty.length == 0 ||
      !updatedProperty
    ) {
      return res.status(400).json({
        error: "Property not found ",
        success: false,
      });
    } else {
      //sending Banking details in response
      res.json({
        message: "Property Details Updated Successfully ",
        success: true,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
