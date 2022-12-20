import { Request, Response } from "express";
import Client from "../Models/Client";

export const Register = async (req: Request, res: Response) => {
  try {
    //Destructuring data from request
    const { firstName, lastName, email, password } = req.body;

    // let isClientRegisterd = await Client.findOne({ email });
    // if (isClientRegisterd) {
    //   return res.status(400).json({ error: "Client email is already registerd" });
    // }

    //Registering Employee in the Db
    const RegisterdClient = await Client.create({
      ...req.body,
    });

    //sending Registerd User response
    res.json({
      message: " Client Successfully Registerd",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const Get = async (req: Request, res: Response) => {
  try {
    const { appId } = req.body;

    //finding Broker

    const ClientInDb = await Client.find({ appId });

    if (ClientInDb) {
      //sending Registerd User response
      res.json({
        message: "fetched Successfully ",
        data: ClientInDb,
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
      firstName,
      lastName,
      email,
      phone,
      HomeAddress,
      city,
      state,
      zipcode,
    } = req.body;
    // Create a newNote object

    interface updatingClientTypes {
      firstName: String;
      lastName: String;
      email: String;
      phone: number;
      HomeAddress: String;
      city: String;
      state: String;
      zipcode: number;
    }

    const updatingClient: updatingClientTypes = {
      firstName,
      lastName,
      email,
      phone,
      HomeAddress,
      city,
      state,
      zipcode,
    };

    if (firstName) {
      updatingClient.firstName = req.body.firstName;
    }
    if (lastName) {
      updatingClient.lastName = req.body.lastName;
    }
    if (email) {
      updatingClient.email = req.body.email;
    }
    if (phone) {
      updatingClient.phone = req.body.phone;
    }
    if (HomeAddress) {
      updatingClient.HomeAddress = req.body.HomeAddress;
    }
    if (city) {
      updatingClient.city = req.body.city;
    }
    if (state) {
      updatingClient.state = req.body.state;
    }
    if (zipcode) {
      updatingClient.zipcode = req.body.zipcode;
    }

    //finding Application of the user by Userid

    const updatedClient = await Client.findByIdAndUpdate(
      appId,
      { $set: updatingClient },
      { new: true }
    );

    if (updatedClient) {
      //sending Registerd User response
      res.json({
        message: " Client Updated Successfully ",
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
