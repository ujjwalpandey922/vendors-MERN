"use client";
import React, { useState, useRef } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { SingleProps } from "../Pages/Edit";
import Form from "./Form";
import { errorProp } from "../Pages/Home";

type Props = {
  type: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  singleVendor: SingleProps | undefined;
  setSingleVendor?: React.Dispatch<
    React.SetStateAction<SingleProps | undefined>
  >;
};
const Modal = ({ type, setShow, singleVendor, setSingleVendor }: Props) => {
  const navto = useNavigate();
  const [errors, setErrors] = useState<errorProp>({});
  const [info, setInfo] = useState({
    id: singleVendor?._id || "",
    name: singleVendor?.name || "",
    bankAccNo: singleVendor?.bankAccNo || "",
    bankName: singleVendor?.bankName || "",
    addL1: singleVendor?.addL1 || "",
    addL2: singleVendor?.addL2 || "",
    city: singleVendor?.city || "",
    country: singleVendor?.country || "",
    Zip: singleVendor?.Zip || "",
  });
  const handleDelete = async () => {
    console.log("delete");
    console.log(JSON.stringify({ id: singleVendor?._id }));
    try {
      const res = await fetch(`http://localhost:8000/api/delete`, {
        method: "DELETE", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          // Add any other headers if needed
        },
        body: JSON.stringify({ id: singleVendor?._id }),
      });
      const data = await res.json();
      if (data) {
        navto("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setShow(false);
  };
  const inner = useRef(null);
  const outer = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const res = await fetch("http://localhost:8000/api/update", {
        method: "PUT", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          // Add any other headers if needed
        },
        body: JSON.stringify({ updatedInfo: info }),
      });
      const data = await res.json();
      if (data) {
        setSingleVendor?.(data);
        handleCancel();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleOuterClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === outer.current) {
      handleCancel();
    }
  };
  return (
    <div
      className="bg-[#00000056] w-full h-screen absolute inset p-12 top-0 flex items-center justify-center"
      ref={outer}
      onClick={(e) => handleOuterClick(e)}
    >
      <div
        className="p-12 rounded-2xl bg-slate-100 w-max flex flex-col gap-8"
        ref={inner}
      >
        {type === "delete" && (
          <>
            <h1 className="text-center font-extrabold text-3xl">
              Delete The Vendor
            </h1>
            <div className="flex justify-between w-full px-8">
              <span>
                {<Button text="Cancel" handleButton={handleCancel} />}
              </span>
              <span>
                {<Button text="Delete" handleButton={handleDelete} />}
              </span>
            </div>
          </>
        )}
        {type === "edit" && (
          <div className="flex flex-col gap-2">
            <h1 className="text-center font-extrabold text-3xl">Edit Vendor</h1>
            <Form
              type="edit"
              info={info}
              handleChange={handleChange}
              onSubmit={onSubmit}
              loading={loading}
              errors={errors}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
