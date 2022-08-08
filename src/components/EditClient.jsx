import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// firebase
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
// react toastify
import { toast } from "react-toastify";
// react icons
import { MdOutlineArrowBackIos } from "react-icons/md";

const EditClient = () => {
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
    email,
    extent,
    documents,
    remarks,
    report,
    status,
    village,
  } = data;

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  // handle input change
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  //   fetch clients to edit
  useEffect(() => {
    setLoading(true);
    const fetchClient = async () => {
      const docRef = doc(db, "clients", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        setClient(docSnap.data());
        setData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/dashboard");
        toast.error("client does not exist");
      }
    };
    fetchClient();
  }, [params.id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataCopy = { ...data };
    dataCopy.timeStamp = serverTimestamp();

    // add a new document in collection clients
    try {
      const docRef = doc(db, "clients", params.id);
      await updateDoc(docRef, dataCopy);
      toast.success("client updated successfully!");
      setData(initialState);
      console.log(client);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Unable to add user 😥");
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="container mx-auto py-10">
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
          Client Details (Family)
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
          type="number"
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
          type="number"
          name="contact"
          id="contact"
          value={contact}
          onChange={handleChange}
          placeholder="Enter contact number"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for email */}
        <label
          htmlFor="email"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter client email"
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        {/* Input for place */}
        <label
          htmlFor="village"
          className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm"
        >
          Place
        </label>
        <input
          type="text"
          name="village"
          id="village"
          value={village}
          onChange={handleChange}
          placeholder="Enter place"
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
          className="border-2 text-sm mt-1 w-full p-2 indent-1 rounded-lg focus:outline-none mb-2"
        />
        <button className="bg-slate-100 w-full text-center p-2 text-sm rounded-full">
          Edit Client
        </button>
      </form>
    </div>
  );
};

export default EditClient;
