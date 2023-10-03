// "use client";
import { ChangeEvent, useEffect, useState } from "react";
import "../App.css";
import Vendors from "../components/Vendors";
import Form from "../components/Form";
export type errorProp = {
  name?: string;
  bankAccNo?: string;
  bankName?: string;
  Zip?: string;
};
const Home = () => {
  const [info, setInfo] = useState({
    name: "",
    bankAccNo: "",
    bankName: "",
    addL1: "",
    addL2: "",
    city: "",
    country: "",
    Zip: "",
  });
  const [loading, setLoading] = useState(false);
  const [vendorsList, setVendorsList] = useState([]);
  const [errors, setErrors] = useState<errorProp>({});
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setInfo((pre) => ({ ...pre, [name]: value }));
  };
  const validate = () => {
    const error = {} as errorProp;
    if (info.name === "") {
      error.name = "Name is Required";
    }
    if (info.bankAccNo === "") {
      error.bankAccNo = "Bank Account No. is Required";
    }
    if (info.bankName === "") {
      error.bankName = "Bank Name is Required";
    }
    if (info.bankAccNo !== "" && isNaN(parseInt(info.bankAccNo))) {
      error.bankAccNo = "Bank Account No. has to be a Number";
    }
    if (isNaN(parseInt(info.Zip))) {
      error.Zip = "Zip code should be a Number";
    }
    return Object.keys(error).length === 0 ? null : error;
  };
  const onSubmit = async () => {
   
    const anyError = validate();
    if (anyError) {
      setErrors((pre) => ({
        ...pre,
        name: anyError.name,
        bankAccNo: anyError.bankAccNo,
        bankName: anyError.bankName,
        Zip: anyError.Zip,
      }));
      return;
    } else {
      setErrors({});
    }
     setLoading(true);
    try {
      const res = await fetch("https://vendors-mern.vercel.app/api/add", {
        method: "POST", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          // Add any other headers if needed
        },
        body: JSON.stringify({ info: info }),
      });
      const data = await res.json();
      if (data) {
        const updatedRes = await fetch(
          "https://vendors-mern.vercel.app/api/get"
        );
        const updatedData = await updatedRes.json();

        // Update the state to reflect the changes
        setVendorsList(updatedData);
        //reset Info
        setInfo({
          name: "",
          bankAccNo: "",
          bankName: "",
          addL1: "",
          addL2: "",
          city: "",
          country: "",
          Zip: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const header = new Headers({ "Access-Control-Allow-Origin": "*" });
      try {
        const res = await fetch("https://vendors-mern.vercel.app/api/get", {
          headers: header,
        });
        const data = await res.json();
        setVendorsList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="flex gap-4 bg-slate-100 min-h-[30rem] p-4 rounded-tr-3xl rounded-bl-3xl relative flex-1">
        <div className="flex flex-col px-6 gap-1">
          <div className="flex justify-center ">
            <img
              alt="log"
              src={"/logo.jpg"}
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>
          <h1 className="text-center font-bold text-4xl md:hidden block">
            Hello Vendors...!
          </h1>
          <div className="flex gap-2 justify-center items-center">
            <hr className="bg-[#AAB2C8] h-[2px] min-w-[10rem] md:block hidden" />
            <span className="font-bold text-[#00002275]">
              Enter Vendor Details
            </span>
            <hr className="bg-[#AAB2C8] h-[2px] min-w-[10rem] md:block hidden" />
          </div>
          <Form
            info={info}
            handleChange={handleChange}
            onSubmit={onSubmit}
            loading={loading}
            errors={errors}
          />
        </div>
        <hr className="bg-[#AAB2C8] w-[1px] h-[30rem] self-center md:block hidden" />

        <div className="flex-1  justify-center items-center md:flex hidden">
          <img alt="bro" height={350} width={500} src="/bro.svg" />
        </div>

        <img
          alt="wave"
          height={350}
          width={400}
          className="absolute bottom-0 right-0 md:block hidden"
          src="/wave.svg"
        />
      </div>
      <Vendors vendorsList={vendorsList} />
    </div>
  );
};

export default Home;
