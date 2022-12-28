import { Schema, model } from "mongoose";
import Application from "./Application";

export interface PropertyType {
  appId: Schema.Types.ObjectId;
  address: String;
  state: String;
  sellerName: String;
  finalSalesPrice: string;
  city: String;
  zipcode: String;
  buyerName: String;
  ClosingDate: Date;
  isShortSale: boolean;
}

const PropertySchema = new Schema<PropertyType>({
  appId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Application,
    unique: true,
  },

  address: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 65,
  },

  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 65,
  },
  sellerName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 65,
  },
  finalSalesPrice: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 35,
  },

  city: {
    type: String,
    required: true,
  },

  zipcode: {
    type: String,
    required: true,
  },

  buyerName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 65,
  },
  ClosingDate: {
    type: Date,
    required: true,
  },
  isShortSale: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const Property = model<PropertyType>("Property", PropertySchema);
export default Property;
