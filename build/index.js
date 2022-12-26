"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./Database/db");
// import router from './Routes/EmployeeRoutes'
const UserRoutes_1 = __importDefault(require("./Routes/UserRoutes"));
const ClientRoutes_1 = __importDefault(require("./Routes/ClientRoutes"));
const ApplicationRoutes_1 = __importDefault(require("./Routes/ApplicationRoutes"));
const BrokerRoutes_1 = __importDefault(require("./Routes/BrokerRoutes"));
const BankingRoutes_1 = __importDefault(require("./Routes/BankingRoutes"));
const SaleConformationRoutes_1 = __importDefault(require("./Routes/SaleConformationRoutes"));
const PropertyRoutes_1 = __importDefault(require("./Routes/PropertyRoutes"));
const AgentRoutes_1 = __importDefault(require("./Routes/AgentRoutes"));
const ClosingCompanyRoutes_1 = __importDefault(require("./Routes/ClosingCompanyRoutes"));
const documentRoutes_1 = __importDefault(require("./Routes/documentRoutes"));
const fileUploadRoutes_1 = __importDefault(require("./Routes/fileUploadRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const path = require("path");
let cors = require("cors");
const app = (0, express_1.default)();
//for parsing the incoming requests with JSON payloads
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//connecting to Db[MongoDb]
(0, db_1.connectToMongo)();
// configure the server's port
app.get("/", (req, res) => {
    res.send("im you server");
});
app.use("/images/", express_1.default.static(path.join(__dirname, "./uploads")));
app.use(cors());
// All Routes for Api
app.use("/api/user", UserRoutes_1.default);
app.use("/api/client", ClientRoutes_1.default);
app.use("/api/application", ApplicationRoutes_1.default);
app.use("/api/broker", BrokerRoutes_1.default);
app.use("/api/banking", BankingRoutes_1.default);
app.use("/api/saleconform", SaleConformationRoutes_1.default);
app.use("/api/property", PropertyRoutes_1.default);
app.use("/api/agent", AgentRoutes_1.default);
app.use("/api/closingcompany", ClosingCompanyRoutes_1.default);
app.use("/api/documentupload", documentRoutes_1.default);
app.use("/api/file", fileUploadRoutes_1.default);
const port = 3000;
//listening server on a port
app.listen(port, () => {
    console.log("server is working on port ", port);
});
