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
exports.getingUser = exports.adminLogin = exports.checkUserExist = exports.Login = exports.Register = void 0;
const User_1 = __importDefault(require("../Models/User"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Application_1 = __importDefault(require("../Models/Application"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Destructuring data from request
        const { firstName, lastName, email, password } = req.body;
        console.log(req.body);
        let isUserRegisterd = yield User_1.default.findOne({ email });
        if (isUserRegisterd) {
            return res.status(400).json({ error: "Email already exists" });
        }
        //encripting password using bcrypt
        const salt = yield bcrypt.genSalt(10);
        const EncriptedPassword = yield bcrypt.hash(req.body.password, salt);
        //Registering Employee in the Db
        const RegisterdUser = yield User_1.default.create(Object.assign(Object.assign({}, req.body), { password: EncriptedPassword }));
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
            user: {
                firstName,
                lastName,
                email,
            },
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Destructuring data from request
        const { email, password } = req.body;
        const loggedinUser = yield User_1.default.find({ email: email });
        const { firstName, lastName } = loggedinUser[0];
        //checking any application is exist or not of a user
        const pendingApplication = yield Application_1.default.find({
            userid: loggedinUser[0]._id,
        });
        console.log("user info", loggedinUser);
        if (!loggedinUser) {
            return res.status(400).json({
                error: "Please try to login with correct credentials",
                success: false,
            });
        }
        const passwordCompare = yield bcrypt.compare(password, loggedinUser[0].password);
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
            pendingApplication,
            success: true,
            user: {
                firstName,
                lastName,
                email: loggedinUser[0].email,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.Login = Login;
const checkUserExist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const loggedinUser = yield User_1.default.find({ email });
        console.log(loggedinUser);
        if (loggedinUser.length == 0) {
            return res.status(400).json({
                error: "email not exist",
                success: false,
            });
        }
        else {
            res.json({
                message: "email exist",
                success: true,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.checkUserExist = checkUserExist;
// checking admin login  Remote it in deployment
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Destructuring data from request
        const { email, password } = req.body;
        const loggedinUser = yield User_1.default.find({ email, isAdmin: true });
        console.log(loggedinUser);
        console.log();
        if (loggedinUser.length == 0) {
            throw new Error("Try With Correct Credentials");
        }
        else {
            const passwordCompare = yield bcrypt.compare(password, loggedinUser[0].password);
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
            res.json({
                message: " Successfully Logged in ",
                authtoken: authtoken,
                idAdmin: loggedinUser[0].isAdmin,
                success: true,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.adminLogin = adminLogin;
//geting user Details
const getingUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log(user);
        const UserDetails = yield User_1.default.find({ _id: user.id });
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
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
exports.getingUser = getingUser;
