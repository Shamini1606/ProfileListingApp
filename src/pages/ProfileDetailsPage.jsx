// src/pages/ProfileDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProfileDetailsPage.css";

const ProfileDetailsPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Change the API endpoint to the new one
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setProfile(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      {profile && (
        <div className="card">
          <img
            src={`https://via.placeholder.com/150`} // Placeholder image
            alt={profile.name}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{profile.name}</h5>
            <p className="card-text">
              <strong>Email:</strong> {profile.email}
            </p>
            <p className="card-text">
              <strong>Phone:</strong> {profile.phone}
            </p>
            <p className="card-text">
              <strong>Location:</strong> {profile.address.city},{" "}
              {profile.address.street}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetailsPage;
