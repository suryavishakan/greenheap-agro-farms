import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// firebase
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
// components
import ClientsTable from "../components/ClientsTable";

const Search = () => {
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
          where("name", "==", params.name),
          orderBy("timeStamp", "desc"),
          limit(10)
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
  }, [params.name]);
  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : data && data.length > 0 ? (
        <>
          <Link to="/dashboard">
            <p>Back</p>
          </Link>
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
                {data.map((client) => (
                  <ClientsTable
                    client={client}
                    id={client.id}
                    key={client.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <Link to="/dashboard">
            <p>Back</p>
          </Link>
          <p>No clients with name {params.name}</p>
        </>
      )}
    </>
  );
};

export default Search;
