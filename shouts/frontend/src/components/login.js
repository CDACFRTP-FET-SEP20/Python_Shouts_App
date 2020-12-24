import React, { useState } from "react";
import { connect } from "react-redux";

function login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log("props", props);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    fetch("/profile/login/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respone) => respone.json())
      .then((data) =>
        props.dispatch({
          type: "AddToken",
          payload: data.token,
        })
      );
  };

  console.log("Token", props.token);

  return (
    <div>
      <h1>Login Page</h1>

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
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.login,
  };
};

export default connect(mapStateToProps)(login);
