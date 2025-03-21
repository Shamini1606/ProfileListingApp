// src/pages/ProfileDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileDetailsPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://backend.graycorp.io:9000/mymate/api/v1/tempClients/${id}`
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
            src={profile.picture}
            alt={profile.name}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{profile.name}</h5>
            <p className="card-text">
              <strong>Contact Number:</strong> {profile.contactNumber}
            </p>
            <p className="card-text">
              <strong>Location:</strong> {profile.location}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetailsPage;
