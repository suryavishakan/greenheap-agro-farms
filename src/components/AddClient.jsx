import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// firebase
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
// react toastify
import { toast } from "react-toastify";
// icons
import { MdOutlineArrowBackIos } from "react-icons/md";

const AddClient = () => {
  const initialState = {
    docNo: "",
    name: "",
    family: "",
    age: "",
    address: "",
    contact: "",
    email: "",
    extent: "",
    documents: "",
    remarks: "",
    report: "",
    status: "",
    village: "",
  };
  const [data, setData] = useState(initialState);
  const {
    docNo,
    name,
    family,
    age,
    address,
    contact,
    currentAddress,
    extent,
    documents,
    remarks,
    report,
    status,
    village,
    pincode,
  } = data;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataCopy = { ...data };
    dataCopy.timeStamp = serverTimestamp();

    // add a new document in collection clients
    try {
      await addDoc(collection(db, "clients"), dataCopy);
      toast.success("client added successfully!");
      setData(initialState);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Unable to add user 😥");
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="px-32 flex items-center">
        <MdOutlineArrowBackIos />
        <Link to="/dashboard">
          <p> Back</p>
        </Link>
      </div>
      <form className="max-w-xl mx-auto px-3" onSubmit={handleSubmit}>
        {/* Input for docNo */}
        <label
          htmlFor="docNo"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Document Number
        </label>
        <input
          type="text"
          name="docNo"
          id="docNo"
          value={docNo}
          onChange={handleChange}
          placeholder="Enter document number"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for name */}
        <label
          htmlFor="name"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter client name"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for family */}
        <label
          htmlFor="family"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Nominees (S/O or D/O)
        </label>
        <input
          type="text"
          name="family"
          id="family"
          value={family}
          onChange={handleChange}
          placeholder="Client details"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for age */}
        <label
          htmlFor="age"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Age
        </label>
        <input
          type="text"
          name="age"
          id="age"
          value={age}
          onChange={handleChange}
          placeholder="Enter client age"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for address */}
        <label
          htmlFor="address"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={handleChange}
          placeholder="Enter client address"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for contact */}
        <label
          htmlFor="contact"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Contact
        </label>
        <input
          type="text"
          name="contact"
          id="contact"
          value={contact}
          onChange={handleChange}
          placeholder="Enter contact number"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for currentAddress */}
        <label
          htmlFor="currentAddress"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Current Address
        </label>
        <input
          type="text"
          name="currentAddress"
          id="currentAddress"
          value={currentAddress}
          onChange={handleChange}
          placeholder="Enter current address"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for village */}
        <label
          htmlFor="village"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Project
        </label>
        <input
          type="text"
          name="village"
          id="village"
          value={village}
          onChange={handleChange}
          placeholder="Enter place name"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for pincode */}
        <label
          htmlFor="pincode"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Pincode
        </label>
        <input
          type="text"
          name="pincode"
          id="pincode"
          value={pincode}
          onChange={handleChange}
          placeholder="Enter pincode"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for extent */}
        <label
          htmlFor="extent"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Extent
        </label>
        <input
          type="text"
          name="extent"
          id="extent"
          value={extent}
          onChange={handleChange}
          placeholder="Enter extent"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for documents submitted */}
        <label
          htmlFor="documents"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Documents Submitted
        </label>
        <input
          type="text"
          name="documents"
          id="documents"
          value={documents}
          onChange={handleChange}
          placeholder="Enter documents submitted"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for remarks */}
        <label
          htmlFor="remarks"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Remarks
        </label>
        <input
          type="text"
          name="remarks"
          id="remarks"
          value={remarks}
          onChange={handleChange}
          placeholder="Enter remarks"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for report */}
        <label
          htmlFor="report"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Report
        </label>
        <input
          type="text"
          name="report"
          id="report"
          value={report}
          onChange={handleChange}
          placeholder="Enter report"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for status */}
        <label
          htmlFor="report"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Status
        </label>
        <input
          type="text"
          name="status"
          id="status"
          value={status}
          onChange={handleChange}
          placeholder="Enter status"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none"
        />
        <p className="text-xs ml-2 mt-0.5">
          Please note : Status values can only be pending or completed
        </p>
        {/* Submit button */}
        <button className="bg-slate-100 w-full text-center p-2 text-sm rounded-full mt-4 mb-4">
          Add Client
        </button>
      </form>
    </div>
  );
};

export default AddClient;
