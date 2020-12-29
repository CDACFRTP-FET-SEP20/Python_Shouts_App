import React, { useState } from "../../node_modules/react";

export default function register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    bio: "",
    is_active: true,
  });

  const [imageData, setImageData] = useState(null);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageData(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const post_data = new FormData();

    for (let key in formData) {
      post_data.append(key, formData[key]);
    }

    post_data.append("user_image", imageData, imageData.name);
    // post_data.append("is_active", true);

    console.log("formdata", post_data);

    fetch("http://localhost:8000/profile/register/", {
      method: "POST",
      body: post_data,
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
          <input type="file" onChange={handleFileChange} />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
}
