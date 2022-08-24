import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// firebase
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
// components
import ClientsTable from "../components/ClientsTable";
// icons
import { MdOutlineArrowBackIos } from "react-icons/md";

const Place = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const searchClient = async () => {
      try {
        // get a reference to the document
        const collectionRef = collection(db, "clients");
        // create a query
        const q = query(
          collectionRef,
          where("village", "==", params.place),
          orderBy("timeStamp", "asc")
        );

        // execute query
        const querySnap = await getDocs(q);

        let data = [];
        querySnap.forEach((doc) => {
          return data.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setData(data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    searchClient();
  }, [params.place]);
  return (
    <>
      {loading ? (
        <div className="container mx-auto">
          <h3>Loading...</h3>
        </div>
      ) : data && data.length > 0 ? (
        <div className="container mx-auto py-10 px-10">
          <div className="flex items-center">
            <MdOutlineArrowBackIos />
            <Link to="/dashboard">
              <p> Back</p>
            </Link>
          </div>
          <div className="overflow-auto pt-10">
            <table className="text-sm ">
              <thead>
                <tr>
                  <th>Doc No</th>
                  <th>Name</th>
                  <th>Client Details (Family)</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Extent</th>
                  <th>Documents Submitted</th>
                  <th>Remarks</th>
                  <th>Report</th>
                </tr>
              </thead>
              <tbody>
                {data.map((client, index) => (
                  <ClientsTable
                    client={client}
                    id={client.id}
                    key={client.id}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <Link to="/dashboard">
            <p>Back</p>
          </Link>
          <p>No clients in {params.status}</p>
        </>
      )}
    </>
  );
};

export default Place;
