import React from "react";
// icons
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ClientsTable = ({ client, id }) => {
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
          <span>View</span>
          <FaEdit className="text-md mt-1" />
          <MdDelete className="font-medium text-base mt-1" />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default ClientsTable;
