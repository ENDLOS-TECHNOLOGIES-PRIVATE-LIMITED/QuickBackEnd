import { Request, Response } from "express";
import User from "../Models/User";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { Schema, ObjectId } from "mongoose";

export const Register = async (req: Request, res: Response) => {
  try {
    //Destructuring data from request
    const { firstName, lastName, email, password } = req.body;

    console.log(req.body);

    let isUserRegisterd = await User.findOne({ email });
    if (isUserRegisterd) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //encripting password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const EncriptedPassword = await bcrypt.hash(req.body.password, salt);

    //Registering Employee in the Db
    const RegisterdUser = await User.create({
      ...req.body,
      password: EncriptedPassword,
    });

    //Generating jwt token for authorization

    const data = {
      user: {
        id: RegisterdUser._id,
        isAdmin: RegisterdUser.isAdmin,
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);

    //sending Registerd User response
    res.json({
      message: " Successfully Registerd",
      authtoken: authtoken,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    //Destructuring data from request
    const { email, password } = req.body;

    const loggedinUser: any = await User.find({ email });

    console.log(loggedinUser);

    if (!loggedinUser) {
      return res.status(400).json({
        error: "Please try to login with correct credentials",
        success: false,
      });
    }

    const passwordCompare = await bcrypt.compare(
      password,
      loggedinUser[0].password
    );

    if (!passwordCompare) {
      return res.status(400).json({
        success: false,
        error: "Please try to login with correct credentials",
      });
    }

    const data = {
      user: {
        id: loggedinUser[0]._id,
        isAdmin: loggedinUser[0].isAdmin,
      },
    };

    const authtoken = jwt.sign(data, process.env.JWT_SECRET);

    // sending Logged in user in response

    res.json({
      message: " Successfully Logged in ",
      authtoken: authtoken,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// checking admin login  Remote it in deployment
export const adminLogin = async (req: any, res: Response) => {
  try {
    //Destructuring data from request

    req.user;

    res.json({
      message: " Successfully Logged in ",
      authtoken: req.user,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};

//geting user Details

export const getingUser = async (req: any, res: Response) => {
  try {
    const user = req.user;

    console.log(user);
    const UserDetails: any = await User.find({ _id: user.id });

    // const { firstName, lastName } = UserDetails[0];

    // console.log(UserDetails[0].firstName);

    const sendingData = {
      firstName: UserDetails[0].firstName,
      lastName: UserDetails[0].lastName,
    };

    // console.log(sendingData);
    // console.log({ firstName, lastName });

    res.json({
      message: " User Details are:",
      data: sendingData,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message, success: false });
  }
};
