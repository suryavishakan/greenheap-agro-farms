import React from "react";
// firebase
import { db } from "../firebase/firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
// icons
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const ClientsTable = ({ client, id }) => {
  // delete document
  const handleDelete = async (id) => {
    const docRef = doc(db, "clients", id);
    await deleteDoc(docRef);
  };

  return (
    <React.Fragment>
      <tr key={id}>
        <td>{client.data.docNo}</td>
        <td>{client.data.name}</td>
        <td>{client.data.family}</td>
        <td>{client.data.age}</td>
        <td>{client.data.address}</td>
        <td>{client.data.contact}</td>
        <td>{client.data.email}</td>
        <td>{client.data.extent}</td>
        <td>{client.data.documents}</td>
        <td>{client.data.remarks}</td>
        <td>{client.data.report}</td>
        <td className="flex flex-col items-center cursor-pointer">
          <Link to={`/dashboard/client/${client.id}`}>
            <span>View</span>
          </Link>
          <Link to={`/dashboard/edit-client/${client.id}`}>
            <FaEdit className="text-md mt-1" />
          </Link>
          <MdDelete
            className="font-medium text-base mt-1"
            onClick={() => handleDelete(client.id)}
          />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default ClientsTable;
