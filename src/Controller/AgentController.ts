import { Request, Response } from "express";
import Agent, { AgentType } from "../Models/Agent";

export const Register = async (req: Request, res: Response) => {
  try {
    const AddedAgent = await Agent.create({
      ...req.body,
    });
    if (AddedAgent) {
      res.json({
        message: " Agent Details Added Successfully  ",
        success: true,
      });
    } else {
      return res.status(400).json({
        error: "Agent Not Added",
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

    const AgentInDb = await Agent.find({ appId });

    if (AgentInDb == null || AgentInDb.length == 0 || !AgentInDb) {
      return res.status(400).json({
        error: "Agent details  not found ",
        success: false,
      });
    } else {
      res.json({
        message: "Agent Details fetched Successfully ",
        data: AgentInDb,
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
      netCommission,
      typeOfAgent,
      totalTransactions,
      pendingTransactions,
      nonPendingListing,
    } = req.body;

    const updatingAgent: AgentType = {
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

    const updatedAgent: any = await Agent.findOneAndUpdate(
      appId,
      { $set: updatingAgent },
      { new: true }
    );

    if (updatedAgent == null || updatedAgent.length == 0 || !updatedAgent) {
      return res.status(400).json({
        error: "Agent not found ",
        success: false,
      });
    } else {
      //sending Banking details in response
      res.json({
        message: "Agent Details Updated Successfully ",
        success: true,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
