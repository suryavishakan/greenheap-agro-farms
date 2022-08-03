import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// firebase
import {
  doc,
  getDocs,
  collection,
  where,
  orderBy,
  limit,
  startAfter,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
// components
import ClientsTable from "./ClientsTable";

const Clients = () => {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        // get a reference
        const docRef = collection(db, "clients");

        // create a query
        const q = query(docRef, orderBy("timeStamp", "desc"), limit(10));

        // execute query
        const docSnap = await getDocs(q);

        const clients = [];

        docSnap.forEach((doc) => {
          return clients.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setClients(clients);
        setLoading(false);
        console.log(clients.data());
      } catch (err) {
        console.log("error fetching data");
      }
    };
    getData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Clients</h3>
        <Link to="/dashboard/add-client">
          <button className="text-sm font-medium">Add client</button>
        </Link>
      </div>
      {loading ? (
        <h3>Loading...</h3>
      ) : clients && clients.length > 0 ? (
        <>
          <div className="overflow-auto">
            <table className="text-xs">
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
                {clients.map((client) => (
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
        <p>No clients</p>
      )}
    </div>
  );
};

export default Clients;
