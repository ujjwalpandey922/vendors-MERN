import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Vendor from "./Models/Vendor.js"; // have to use js for files......
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
});
app.use(express.json()); // parse data into json
env.config(); // connect to mongo db
app.use(
  cors({
    origin: true,
    // methods: ["POST", "GET", "PUT", "DELETE"],
    // credentials: true,
  })
); //cors
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("====================================");
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};
//check if everything is working fine
// app.use("/", (req, res) => {
//   res.send("eeee");
// });

//--------------ROUTES------------------
// app.use("/api/add",routeName)// or directly use post as the app is small
//steps Connect to DB THen Create a model then add it to the db
// ---------ADD----------------
app.post("/api/add", async (req, res) => {
  const data = req.body.info;
  try {
    const newEntry = Vendor({
      ...data,
    });
    await newEntry.save();
    res
      .status(200)
      .send({ message: "Vendor Created Successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error in adding");
  }
});
// ------------GET ALL INFOS----------
app.get("/api/get", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  try {
    const foundAllVendors = await Vendor.find();
    res.status(200).json(foundAllVendors);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error in fetching Data");
  }
});
// ------------GET One INFO----------
app.get("/api/:id", async (req, res) => {
  try {
    const foundOneVendor = await Vendor.findById(req.params.id);
    res.status(200).json(foundOneVendor);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error in fetching Data");
  }
});
// ------------Delete Vendors----------
app.delete("/api/delete", async (req, res) => {
  const VendorId = req.body.id;
  try {
    // Use findByIdAndDelete to delete the vendor by ID
    const deletedVendor = await Vendor.findByIdAndDelete(VendorId);

    // Check if the vendor was found and deleted successfully
    if (deletedVendor) {
      res
        .status(200)
        .json({ message: "Vendor Deleted Successfully", success: true });
    } else {
      // If the vendor was not found
      res.status(404).json({ message: "Vendor Not Found", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error in Deleting DATA");
  }
});
// ------------Update Vendors----------
app.put("/api/update", async (req, res) => {
  const VendorNewInfo = req.body.updatedInfo;
  const { id, ...restInfo } = VendorNewInfo;
  try {
    // Use findByIdAndDelete to delete the vendor by ID
    const updatedValue = await Vendor.findByIdAndUpdate(
      id,
      {
        $set: restInfo,
      },
      { new: true }
    );

    // Check if the vendor was found and deleted successfully
    if (updatedValue) {
      res.status(200).json(updatedValue);
    } else {
      // If the vendor was not found
      res.status(404).json("Vendor Not Updated");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error in Updating DATA");
  }
});
//start server
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Euuuuu",
  });
});

app.listen(8000, () => {
  connect();
  console.log("Listening on PORT 8000");
});
