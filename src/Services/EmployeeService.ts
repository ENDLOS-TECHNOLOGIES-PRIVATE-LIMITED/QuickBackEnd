import {DocumentDefinition,FilterQuery,UpdateQuery,QueryOptions} from 'mongoose';

import Employee from '../Models/Employees';
import { EmployeeDocument } from '../Models/Employees';


export function createEmployee (input:DocumentDefinition<EmployeeDocument>)
{

    return Employee.create(input)

}