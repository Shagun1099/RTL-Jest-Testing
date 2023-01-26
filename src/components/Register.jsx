import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const postUser = async () => {
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        firstName,
        lastName,
        email,
      }
    );
    setUsers([...users, data]);
  };

  return (
    <div className="login-container">
      {users.map(({ id, firstName, lastName, email }) => (
        <li key={id}>{firstName + " " + lastName + "/" + email}</li>
      ))}
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={postUser}>Register</button>
    </div>
  );
};

export default Register;
