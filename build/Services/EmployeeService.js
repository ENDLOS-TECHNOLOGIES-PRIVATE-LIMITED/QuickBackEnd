"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployee = void 0;
const Employees_1 = __importDefault(require("../Models/Employees"));
function createEmployee(input) {
    return Employees_1.default.create(input);
}
exports.createEmployee = createEmployee;
