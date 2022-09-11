import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// components
import ClientsTable from "./ClientsTable";
// hooks
import { useCollection } from "../hooks/useCollection";

const Clients = () => {
  const { documents: clients, loading } = useCollection("clients");

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/dashboard/search/${search}`);
    setSearch("");
  };

  const handlePending = () => {
    navigate("/dashboard/pending");
  };

  const handleComplete = () => {
    navigate("/dashboard/completed");
  };

  const handleVillage = (place) => {
    navigate(`/dashboard/place/${place}`);
  };

  // remove duplicate places
  let places = [];
  for (let i = 0; i < clients?.length; i++) {
    places.push(clients[i].data.village);
  }
  let placesFilter = places.filter((place, index) => {
    return places.indexOf(place) === index;
  });

  return (
    <div className="container mx-auto py-10 px-10">
      <div className="flex justify-between items-center pb-5">
        <h3 className="font-medium text-lg">Dashboard</h3>
        <div className="flex mx-2 items-center ">
          <h3 className="mr-2">Filter Places : </h3>
          {placesFilter.map((place, index) => (
            <React.Fragment key={index}>
              <span>#</span>
              <p
                className="underline underline-offset-1 mr-1 cursor-pointer"
                onClick={(e) => handleVillage(e.target.innerHTML)}
              >
                {place}
              </p>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="py-2 px-4 rounded-lg bg-orange-100 text-sm mr-2"
            onClick={handlePending}
          >
            Pending
          </button>
          <button
            className="py-2 px-4 rounded-lg bg-green-100 text-sm mr-2"
            onClick={handleComplete}
          >
            Completed
          </button>
          <form className="flex border-2 rounded mr-4" onSubmit={handleSubmit}>
            <input
              type="search"
              id="search-dropdown"
              className="py-1.5 px-2 indent-2 text-sm  bg-gray-50 border border-gray-300 focus:outline-none rounded-tl-lg rounded-bl-lg"
              placeholder="Search contact..."
              value={search}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="p-1.5 text-sm font-medium text-white bg-blue-500 rounded-r-lg "
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
          <Link to="/dashboard/add-client">
            <button className="text-sm font-base bg-blue-500 py-2 px-4 rounded-lg text-white">
              Add client
            </button>
          </Link>
        </div>
      </div>
      {loading ? (
        <h3>Loading...</h3>
      ) : clients && clients.length > 0 ? (
        <>
          <div className="overflow-auto pt-10" style={{ height: "560px" }}>
            <table className="text-sm ">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Doc No</th>
                  <th>Name</th>
                  <th>Nominees(S/O or D/O)</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Current Address</th>
                  <th>Project</th>
                  <th>Pincode</th>
                  <th>Extent</th>
                  <th>Documents Submitted</th>
                  <th>Remarks</th>
                  <th>Report</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
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
        </>
      ) : (
        <p>No clients</p>
      )}
    </div>
  );
};

export default Clients;
