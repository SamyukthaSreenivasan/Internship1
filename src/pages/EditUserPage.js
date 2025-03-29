import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`).then((res) => {
      setUser({
        first_name: res.data.data.first_name,
        last_name: res.data.data.last_name,
        email: res.data.data.email,
      });
    });
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      navigate("/users");
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <div className="p-4">
      <h2>Edit User</h2>
      <input className="border p-2 w-full my-2" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
      <input className="border p-2 w-full my-2" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} />
      <input className="border p-2 w-full my-2" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
      <button className="bg-blue-500 text-white px-3 py-1" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditUserPage;
