import React, { useState, useEffect } from "react";
// react router
import { Link, useParams } from "react-router-dom";
// firestore
import { getDoc, doc } from "firebase/firestore";
// firestore db
import { db } from "../firebase/firebase.config";
// icons
import { MdOutlineArrowBackIos } from "react-icons/md";

const Client = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      const docRef = doc(db, "clients", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        setClient(docSnap.data());
        setLoading(false);
      }
    };
    fetchClient();
  }, [params.id]);

  if (loading) {
    return <h3>Loading..</h3>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="px-32 flex items-center">
        <MdOutlineArrowBackIos />
        <Link to="/dashboard">
          <p> Back</p>
        </Link>
      </div>
      <>
        <table className="mx-auto viewTable">
          <tbody>
            <tr>
              <td>Doc No</td>
              <td>{client.docNo}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{client.name}</td>
            </tr>
            <tr>
              <td>Nominees(S/O or D/O)</td>
              <td>{client.family}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{client.age}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{client.address}</td>
            </tr>
            <tr>
              <td>Contact</td>
              <td>{client.contact}</td>
            </tr>
            <tr>
              <td>Current Address</td>
              <td>{client.currentAddress}</td>
            </tr>
            <tr>
              <td>Project</td>
              <td>{client.village}</td>
            </tr>
            <tr>
              <td>Pincode</td>
              <td>{client.pincode}</td>
            </tr>
            <tr>
              <td>Extent</td>
              <td>{client.extent}</td>
            </tr>
            <tr>
              <td>Documents Submitted</td>
              <td>{client.documents}</td>
            </tr>
            <tr>
              <td>Remarks</td>
              <td>{client.remarks}</td>
            </tr>
            <tr>
              <td>Report</td>
              <td>{client.report}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{client.status}</td>
            </tr>
          </tbody>
        </table>
      </>
    </div>
  );
};

export default Client;
