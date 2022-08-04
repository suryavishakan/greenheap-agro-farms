import { Link } from "react-router-dom";
// components
import ClientsTable from "./ClientsTable";
// hooks
import { useCollection } from "../hooks/useCollection";

const Clients = () => {
  const { documents: clients, loading } = useCollection("clients");

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Clients</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer">
            <lord-icon
              src="https://cdn.lordicon.com/pvbutfdk.json"
              trigger="hover"
              style={{ width: "20px", height: "20px" }}
            ></lord-icon>
            <span className="text-sm font-medium mr-4">Search</span>
          </div>
          <Link to="/dashboard/add-client">
            <button className="text-sm font-medium">Add client</button>
          </Link>
        </div>
      </div>
      {loading ? (
        <h3>Loading...</h3>
      ) : clients && clients.length > 0 ? (
        <>
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
