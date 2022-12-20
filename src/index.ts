import express, { Request, Response } from "express";
import { connectToMongo } from "./Database/db";
// import router from './Routes/EmployeeRoutes'
import userroutes from "./Routes/UserRoutes";
import clientroutes from "./Routes/ClientRoutes";
import applicationroutes from "./Routes/ApplicationRoutes";
import brokerRoutes from "./Routes/BrokerRoutes";
import bankingRoutes from "./Routes/BankingRoutes";
import saleConformationRoutes from "./Routes/SaleConformationRoutes";
import PropertyRoutes from "./Routes/PropertyRoutes";
import AgentRoutes from "./Routes/AgentRoutes";
import ClosingCompanyRoutes from "./Routes/ClosingCompanyRoutes";
import UploadDocument from "./Routes/documentRoutes";
import fileUploadRoutes from "./Routes/fileUploadRoutes";
import bodyParser from "body-parser";

const path = require("path");

let cors = require("cors");

const app = express();

//for parsing the incoming requests with JSON payloads

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connecting to Db[MongoDb]
connectToMongo();

// configure the server's port

app.get("/", (req: Request, res: Response): void => {
  res.send("im you server");
});

app.use("/images/", express.static(path.join(__dirname, "./uploads")));

app.use(cors());

// All Routes for Api

app.use("/api/user", userroutes);
app.use("/api/client", clientroutes);
app.use("/api/application", applicationroutes);
app.use("/api/broker", brokerRoutes);
app.use("/api/banking", bankingRoutes);
app.use("/api/saleconform", saleConformationRoutes);
app.use("/api/property", PropertyRoutes);
app.use("/api/agent", AgentRoutes);
app.use("/api/closingcompany", ClosingCompanyRoutes);
app.use("/api/documentupload", UploadDocument);
app.use("/api/file", fileUploadRoutes);

const port: Number = 3000;

//listening server on a port

app.listen(port, () => {
  console.log("server is working on port ", port);
});
