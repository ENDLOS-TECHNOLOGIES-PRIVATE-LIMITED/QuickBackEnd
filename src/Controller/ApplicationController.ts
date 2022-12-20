import { Request, Response } from "express";
import Agent from "../Models/Agent";
import Application, { ApplicationType } from "../Models/Application";
import Banking from "../Models/Banking";
import Broker from "../Models/Broker";
import Client from "../Models/Client";
import ClosingCompany from "../Models/ClosingCompay";
import fileUpload from "../Models/fileUpload";
import Property from "../Models/Property";
import SaleConformation from "../Models/SaleConformation";
import uploadDocument from "../Models/uploadDocument";

export const Register = async (req: any, res: Response) => {
  try {
    const userid = req.user.id;

    const RegisterdApplication = await Application.create({
      ...req.body,
      userid,
    });

    //sending Application in User response
    if (RegisterdApplication) {
      res.json({
        message: " Application Successfully Registerd",
        data: { appId: RegisterdApplication._id },
        success: true,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};
export const Edit = async (req: Request, res: Response) => {
  try {
    const {
      id,
      isCompleted,
      isClientCompleted,
      isSaleCompleted,
      isBrokerCompleted,
      isBankingCompleted,
      isDocumentUploaded,
      amount,
      status,
    } = req.body;
    // Create a newNote object

    interface updatingApplicationTypes {
      isCompleted: {
        date?: Date;
        iscomplete?: boolean;
      };
      isClientCompleted?: boolean;
      isSaleCompleted?: boolean;
      isBrokerCompleted?: boolean;
      isBankingCompleted?: boolean;
      isDocumentUploaded?: boolean;
      amount?: number;
      status?: String;
    }

    const updatingApplication: updatingApplicationTypes = {
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
    } else {
      // const updatedApplication: any = await Application.findOneAndUpdate(
      //   { userid: `${req.body.userid}` },
      //   { $set: updatingApplication },
      //   { new: true }
      // );

      const updatedApplication: any = await Application.findByIdAndUpdate(
        id,
        { $set: updatingApplication },
        { new: true }
      );

      // const findone: any = await Application.find({ userid });
      // console.log("finded one is ", findone);
      // console.log(" updated application is ", updatedApplication);

      if (updatedApplication.length == 0 || !updatedApplication) {
        return res.status(400).json({
          error: "Application not found ",
          success: false,
        });
      } else {
        //sending ClosingCompany details in response
        res.json({
          message: " Application Updated Successfully ",
          status: true,
          data: updatedApplication,
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const All = async (req: any, res: Response) => {
  try {
    // const { userid } = req.body;

    const user = req.user;

    if (req.user.isAdmin === true) {
      //geting All Application from the Db
      const AllApplicatons: any = await Application.find({});

      //Taking AppId form the All Applications and Storing in An Array

      const AppIdArry = AllApplicatons.map((element: any) =>
        element._id.toString()
      );

      const AllApplicationData = await Promise.all(
        AppIdArry.map(async (appId: any) => {
          const ApplicationDetails = await Application.find({ _id: appId });
          const client = await Client.find({ appId });
          const isSalesConformation = await SaleConformation.find({
            appId,
          });
          const PropertyDetails = await Property.find({
            appId,
          });
          const AgentDetails = await Agent.find({
            appId,
          });
          const ClosingCompanyDetails = await ClosingCompany.find({
            appId,
          });
          const BrokerDetails = await Broker.find({
            appId,
          });
          const BankingDetails = await Banking.find({
            appId,
          });
          // const doucmentDetails = await uploadDocument.find({
          //   appId,
          // });
          const doucmentDetails = await fileUpload.find({
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
        })
      );

      // console.log(AllApplicationData);

      res.json({
        message: "Data is fetched Successfully",
        success: true,
        data: AllApplicationData,
      });
    } else {
      res.json({
        message: "UnAuthorized",
        success: false,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};
export const Get = async (req: any, res: Response) => {
  try {
    // const { userid } = req.body;

    const user = req.user;
    // console.log("im your middleware data ", user);

    const userid = user.id;

    console.log(userid);

    // console.log("user in app controller", req);

    // console.log(userid);
    //finding Appllication

    const ApplicationInDb = await Application.find({ userid });
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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
