import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

const XPagination = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setData(res.data);
    } catch (error) {
      console.error("error fetching api:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);
  const nextPage = () => {
    if (page < 5) {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <table className="employee-table">
        <thead className="employee-table-head">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody className="employee-details">
          {currentRows.map((index) => {
            return (
              <tr key={index.id}>
                <td>{index.id}</td>
                <td>{index.name}</td>
                <td>{index.email}</td>
                <td>{index.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage}>Previous</button>
        <button>{page}</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </>
  );
};

export default XPagination;
