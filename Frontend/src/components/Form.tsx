import React from "react";
import Input from "./Input";
import Button from "./Button";
import { errorProp } from "../Pages/Home";
type FormProp = {
  info: {
    id?: string;
    name: string ;
    bankAccNo: string ;
    bankName: string ;
    addL1: string ;
    addL2: string ;
    city: string ;
    country: string ;
    Zip: string ;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => Promise<void>;
  loading: boolean;
  type?: string;
  errors?:errorProp
};
const Form = ({ info, handleChange, onSubmit, loading, type,errors }: FormProp) => {
  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <Input
        placeholder="Name"
        value={info?.name}
        onChange={handleChange}
        name="name"
        required={true}
        error={errors?.name}
      />
      <Input
        placeholder="Bank Account No"
        value={info?.bankAccNo}
        onChange={handleChange}
        name="bankAccNo"
        required={true}
        error={errors?.bankAccNo}
      />
      <Input
        placeholder="Bank Name"
        value={info?.bankName}
        onChange={handleChange}
        name="bankName"
        required={true}
        error={errors?.bankName}
      />
      <Input
        placeholder="Address Line 1"
        value={info?.addL1}
        onChange={handleChange}
        name="addL1"
      />
      <Input
        placeholder="Address Line 2"
        value={info?.addL2}
        onChange={handleChange}
        name="addL2"
      />
      <Input
        placeholder="City"
        value={info?.city}
        onChange={handleChange}
        name="city"
      />
      <Input
        placeholder="Country"
        value={info?.country}
        onChange={handleChange}
        name="country"
      />
      <Input
        placeholder="Zip Code"
        value={info?.Zip}
        onChange={handleChange}
        name="Zip"
        error={errors?.Zip}
      />
      <Button
        text={type !== "edit" ? "Create Vendor" : "Edit Details"}
        // type="submit"
        handleButton={onSubmit}
        loading={loading}
      />
    </form>
  );
};

export default Form;
