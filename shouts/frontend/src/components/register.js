import React, { useState } from "../../node_modules/react";

export default function register() {

  const imagedata = new FormData()

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    bio: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata", formData);

    fetch("http://localhost:8000/profile/register/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respone) => respone.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h1>Register Page</h1>

      <form>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={handleChange}
            name="username"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
        </div>
        <div>
          <label>Bio</label>
          <input
            type="text"
            value={formData.bio}
            onChange={handleChange}
            name="bio"
          />
        </div>

        <div>
          <label>Profile Image</label>
          <input type="file" id="img" name="img" accept="image/*"></input>
        </div>

        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
}
