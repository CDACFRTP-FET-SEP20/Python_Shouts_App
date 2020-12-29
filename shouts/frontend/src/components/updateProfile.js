import React from "react";

export default function updateProfile() {
  return (
    <div>
      <form>
        <div>
          <label>Email</label>
          <input
            type="text"
            // value={formData.email}
            // onChange={handleChange}
            name="email"
          />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            // value={formData.username}
            // onChange={handleChange}
            name="username"
          />
        </div>
        <div>
          <label>Bio</label>
          <input
            type="text"
            // value={formData.bio}
            // onChange={handleChange}
            name="bio"
          />
        </div>

        <div>
          <label>Profile Image</label>
          <input type="file" />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
