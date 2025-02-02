import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/Usercontext";
import { toast } from "react-toastify";

export default function Profile() {
  const { current_user, updateUser, fetchCurrentUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: current_user?.username || "",
    email: current_user?.email || "",
    password: "",
  });

  useEffect(() => {
    if (current_user) {
      setFormData({
        username: current_user.username,
        email: current_user.email,
        password: "",
      });
    }
  }, [current_user]);

  if (!current_user) {
    return <h3 className="text-danger text-center mt-5">Not Authorized</h3>;
  }

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email) {
      toast.error("Username and email cannot be empty.");
      return;
    }

    setLoading(true);
    const success = await updateUser(formData);
    if (success) {
      toast.success("Profile updated successfully.");
      await fetchCurrentUser(); // Refresh user data after update
      setIsEditing(false);
    } else {
      toast.error("Failed to update profile.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5 p-4 bg-white shadow rounded">
      <h2 className="h3 mb-4">Profile</h2>

      <div className="mb-4">
        {/* Username */}
        <div className="d-flex justify-content-between border-bottom py-2">
          <h3 className="h5 mb-0">Username</h3>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control w-50"
            />
          ) : (
            <p className="mb-0 text-muted">{current_user.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="d-flex justify-content-between border-bottom py-2">
          <h3 className="h5 mb-0">Email</h3>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control w-50"
            />
          ) : (
            <p className="mb-0 text-muted">{current_user.email}</p>
          )}
        </div>

        {/* Password */}
        {isEditing && (
          <div className="d-flex justify-content-between border-bottom py-2">
            <h3 className="h5 mb-0">New Password</h3>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control w-50"
            />
          </div>
        )}

        {/* Approval Status */}
        <div className="d-flex justify-content-between border-bottom py-2">
          <h3 className="h5 mb-0">Approval Status</h3>
          <p
            className={`mb-0 fw-semibold ${
              current_user.is_approved ? "text-success border px-2 py-1" : "text-danger"
            }`}
          >
            {current_user.is_approved ? "Approved" : "Pending Approval"}
          </p>
        </div>

        {/* Admin Status */}
        <div className="d-flex justify-content-between border-bottom py-2">
          <h3 className="h5 mb-0">Admin Status</h3>
          <p
            className={`mb-0 fw-semibold ${
              current_user.is_admin ? "text-primary" : "text-warning border px-2 py-1"
            }`}
          >
            {current_user.is_admin ? "Admin" : "User"}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="text-end">
        {isEditing ? (
          <>
            <button className="btn btn-success px-4 py-2 me-2" onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button className="btn btn-secondary px-4 py-2" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-primary px-4 py-2" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
