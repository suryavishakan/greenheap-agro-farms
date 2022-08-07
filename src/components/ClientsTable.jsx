import React from "react";
// firebase
import { db } from "../firebase/firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
// icons
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const ClientsTable = ({ client, id, index }) => {
  // delete document
  const handleDelete = async (id) => {
    const docRef = doc(db, "clients", id);
    await deleteDoc(docRef);
  };

  return (
    <React.Fragment>
      <tr key={id}>
        <td>{index + 1}</td>
        <td>{client.data.docNo}</td>
        <td>{client.data.name}</td>
        <td>{client.data.family}</td>
        <td>{client.data.age}</td>
        <td>{client.data.address}</td>
        <td>{client.data.contact}</td>
        <td>{client.data.email}</td>
        <td>{client.data.village}</td>
        <td>{client.data.extent}</td>
        <td>{client.data.documents}</td>
        <td>{client.data.remarks}</td>
        <td>{client.data.report}</td>
        <td>{client.data.status}</td>
        <td className="flex flex-col items-center justify-center mt-5">
          <React.Fragment>
            <Link to={`/dashboard/client/${client.id}`}>
              <span>View</span>
            </Link>
            <Link to={`/dashboard/edit-client/${client.id}`}>
              <FaEdit className="text-base font-medium mt-3" />
            </Link>
            <MdDelete
              className="font-medium text-xl mt-3"
              onClick={() => handleDelete(client.id)}
            />
          </React.Fragment>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default ClientsTable;
