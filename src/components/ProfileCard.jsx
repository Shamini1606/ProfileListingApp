// src/components/ProfileCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ profile }) => {
  return (
    <div className="card">
      <img src={profile.picture} alt={profile.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{profile.name}</h5>
        <Link to={`/profile/${profile.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
