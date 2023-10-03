import mongoose from "mongoose";
const { Schema } = mongoose;
//  Vendor Name*, Bank Account No*., Bank Name*, Address Line 1, Address Line 2, City, Country, Zip Code.
const VendorSchema = new Schema(
  {
    name: { type: String, required: true },
    bankAccNo: { type: Number, required: true },
    bankName: { type: String, required: true },
    addL1: { type: String },
    addL2: { type: String },
    city: { type: String },
    country: { type: String },
    Zip: { type: Number },
  },
  { timestamps: true }
);
// export deault mongoose.model("DBNAME",schema)
export default mongoose.model("Vendor", VendorSchema);
