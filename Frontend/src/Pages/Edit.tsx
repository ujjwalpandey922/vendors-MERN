// "use client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import Modal from "../components/Modal";
export type SingleProps = {
  bankAccNo: string;
  bankName: string;
  createdAt: string;
  name: string;
  updatedAt: string;
  __v: string;
  _id: string;
  addL1?: string;
  addL2?: string;
  city?: string;
  country?: string;
  Zip?: string;
};
const Edit = () => {
  const [singleVendor, setSingleVendor] = useState<SingleProps>();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { id } = useParams();
  const Navto = useNavigate();
  useEffect(() => {
    const fetchSingleData = async () => {
      try {
        const res = await fetch(
          `https://vendor-backend-tc15.onrender.com/api/${id}`
        );
        const data = await res.json();
        setSingleVendor({ ...data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleData();
  }, [id]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between  p-8">
      <div className="flex flex-col gap-4 bg-slate-100 min-h-[30rem] p-12 rounded-3xl w-full md:w-[50rem] relative">
        <div className="relative w-full">
          <IoMdArrowRoundBack
            size={25}
            className="cursor-pointer hover:scale-105 absolute md:top-0 left-0 -top-6 "
            onClick={() => Navto("/")}
          />
          <h2 className="text-center font-extrabold text-3xl ">
            Vendor details
          </h2>
          <span className="flex gap-4 items-center justify-center absolute md:top-0 right-0 -top-6 ">
            <AiOutlineEdit
              size={25}
              className="cursor-pointer hover:scale-105"
              onClick={() => setShowEdit(true)}
            />
            <AiOutlineDelete
              size={25}
              className="cursor-pointer hover:scale-105"
              onClick={() => setShowDelete(true)}
            />
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-4 justify-between items-center">
            <h2 className="font-bold text-2xl ">Name: </h2>
            <span className="font-medium text-xl text-gray-500 truncate">
              {singleVendor?.name}{" "}
            </span>
          </div>
          <div className="flex gap-4 justify-between items-center">
            <h2 className="font-bold text-2xl ">Bank Account No: </h2>
            <span className="font-medium text-xl text-gray-500 truncate">
              {singleVendor?.bankAccNo}{" "}
            </span>
          </div>
          <div className="flex gap-4 justify-between items-center">
            <h2 className="font-bold text-2xl ">Bank Name: </h2>
            <span className="font-medium text-xl text-gray-500 truncate">
              {singleVendor?.bankName}{" "}
            </span>
          </div>
          {singleVendor?.addL1 && (
            <div className="flex gap-4 justify-between items-center">
              <h2 className="font-bold text-2xl ">Address Line 1: </h2>
              <span className="font-medium text-xl text-gray-500 truncate">
                {singleVendor?.addL1}{" "}
              </span>
            </div>
          )}
          {singleVendor?.addL2 && (
            <div className="flex gap-4 justify-between items-center">
              <h2 className="font-bold text-2xl ">Address Line 2: </h2>
              <span className="font-medium text-xl text-gray-500 truncate">
                {singleVendor?.addL2}{" "}
              </span>
            </div>
          )}
          {singleVendor?.city && (
            <div className="flex gap-4 justify-between items-center">
              <h2 className="font-bold text-2xl ">City: </h2>
              <span className="font-medium text-xl text-gray-500 truncate">
                {singleVendor?.city}{" "}
              </span>
            </div>
          )}
          {singleVendor?.country && (
            <div className="flex gap-4 justify-between items-center">
              <h2 className="font-bold text-2xl ">Country: </h2>
              <span className="font-medium text-xl text-gray-500 truncate">
                {singleVendor?.country}{" "}
              </span>
            </div>
          )}
          {singleVendor?.Zip && (
            <div className="flex gap-4 justify-between items-center">
              <h2 className="font-bold text-2xl ">Zip Code: </h2>
              <span className="font-medium text-xl text-gray-500 truncate">
                {singleVendor?.Zip}{" "}
              </span>
            </div>
          )}
        </div>
      </div>
      {showDelete && (
        <Modal
          type="delete"
          setShow={setShowDelete}
          singleVendor={singleVendor}
        />
      )}
      {showEdit && (
        <Modal
          type="edit"
          setShow={setShowEdit}
          setSingleVendor={setSingleVendor}
          singleVendor={singleVendor}
        />
      )}
    </div>
  );
};

export default Edit;
