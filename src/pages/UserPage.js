import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
    };
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Users</h2>
      <div className="grid grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>
            </div>
            <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full" />
            <div>
              <button className="bg-green-500 text-white px-3 py-1 m-1" onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 m-1" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UserPage;
