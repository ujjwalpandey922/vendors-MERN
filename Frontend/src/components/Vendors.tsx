"use client"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
export type DbProps = {
  vendorsList: {
    bankAccNo: number;
    bankName: string;
    createdAt: string;
    name: string;
    updatedAt: string;
    __v: number;
    _id: string;
    addL1?: string;
    addL2?: string;
    city?: string;
    country?: string;
    Zip?: string;
  }[];
};

const Vendors = ({ vendorsList }: DbProps) => {
  const numberOfVendorsPerPage = 4;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const lastIndex = currentPageNumber*numberOfVendorsPerPage;
  const firstIndex = lastIndex - numberOfVendorsPerPage;
  const currentPost = vendorsList.slice(firstIndex,lastIndex);
  const MaxPages = Math.ceil(vendorsList.length/numberOfVendorsPerPage)
  const handlePrev = () => {
    setCurrentPageNumber(pre=>--pre)
  };
  const handleNext = () => {
     setCurrentPageNumber((pre) => ++pre);
  };
  return (
    <>
      <div className="my-8 p-8 flex flex-wrap gap-8 items-stretch  justify-center max-w-[80rem] w-full">
        {currentPost.map((vendor) => (
          <div className="w-[15rem] h-full" key={vendor._id}>
            <Link
              to={`/${vendor._id}`}
              className="block max-w-sm p-6   bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="truncate mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {vendor.name}
              </h5>
              <p className="font-normal truncate text-gray-700 dark:text-gray-400">
                {vendor.bankAccNo}
              </p>
              <p className="font-normal truncate text-gray-700 dark:text-gray-400">
                {vendor.bankName}
              </p>
            </Link>
          </div>
        ))}
      </div>
      {vendorsList.length > 4 && (
        <div className="flex justify-between w-full px-8 max-w-[80rem]">
          <span>
            {currentPageNumber !== 1 && (
              <Button text="Prev" handleButton={handlePrev} />
            )}
          </span>
          <span>
            {currentPageNumber !== MaxPages && (
              <Button text="Next" handleButton={handleNext} />
            )}
          </span>
        </div>
      )}
    </>
  );
};

export default Vendors;
