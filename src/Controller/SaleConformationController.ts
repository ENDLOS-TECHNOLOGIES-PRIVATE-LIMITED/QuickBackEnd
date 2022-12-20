import { Request, Response } from "express";
import SaleConformation, {
  SaleConformationTypes,
} from "../Models/SaleConformation";

export const Register = async (req: Request, res: Response) => {
  try {
    const saleconformInDb = await SaleConformation.create({
      ...req.body,
    });
    if (saleconformInDb) {
      res.json({
        message: " Successfully Added Conformation",
      });
    } else {
      return res.status(400).json({
        error: "Not Added",
        success: false,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const Get = async (req: Request, res: Response) => {
  try {
    const { appId } = req.body;

    //finding Broker

    const SaleConInDb = await SaleConformation.find({ appId });

    if (SaleConInDb == null || SaleConInDb.length == 0 || !SaleConInDb) {
      return res.status(400).json({
        error: "SaleConformation details  not found ",
        success: false,
      });
    } else {
      res.json({
        message: "Details fetched Successfully ",
        data: SaleConInDb,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const Edit = async (req: Request, res: Response) => {
  try {
    const { appId, isBroker, isTakenAdvance } = req.body;

    const updatingSaleConformation: SaleConformationTypes = {
      appId,
      isBroker,
      isTakenAdvance,
    };

    if (isBroker) {
      updatingSaleConformation.isBroker = req.body.isBroker;
    }
    if (isTakenAdvance) {
      updatingSaleConformation.isTakenAdvance = req.body.isTakenAdvance;
    }

    //finding Application of the user by Userid

    const updatedSconform: any = await SaleConformation.findOneAndUpdate(
      appId,
      { $set: updatingSaleConformation },
      { new: true }
    );

    console.log(updatedSconform);

    if (
      updatedSconform == null ||
      updatedSconform.length == 0 ||
      !updatedSconform
    ) {
      return res.status(400).json({
        error: "SaleConformation not found ",
        success: false,
      });
    } else {
      //sending Banking details in response
      res.json({
        message: "SaleConformation Details Updated Successfully ",
        success: true,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
