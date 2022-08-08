import React from "react";
import { Link } from "react-router-dom";
// firebase
import { db } from "../firebase/firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
// icons
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

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
        <td className="text-center">
          <span
            className={
              client.data.status === "completed"
                ? "text-center py-2 px-4 rounded-sm bg-green-100"
                : "text-center py-2 px-4 rounded-sm bg-orange-100"
            }
          >
            {client.data.status}
          </span>
        </td>
        <td className="flex flex-col items-center justify-center mt-5">
          <React.Fragment>
            <Link to={`/dashboard/client/${client.id}`}>
              <span className="underline underline-offset-1">View</span>
            </Link>
            <Link to={`/dashboard/edit-client/${client.id}`}>
              <FaEdit className="text-base font-medium mt-3 text-slate-600" />
            </Link>
            <MdDelete
              className="font-medium text-xl mt-3 text-red-400 cursor-pointer"
              onClick={() => handleDelete(client.id)}
            />
          </React.Fragment>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default ClientsTable;
