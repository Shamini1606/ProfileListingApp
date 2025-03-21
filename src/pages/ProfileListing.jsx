// src/pages/ProfileListing.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../store/profilesSlice";
import ProfileCard from "../components/ProfileCard";
import { motion } from "framer-motion"; // Ensure this import is present
import "./ProfileListing.css";

const ProfileListing = () => {
  const dispatch = useDispatch();
  const { profiles, loading, error } = useSelector((state) => state.profiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 10;

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  return (
    <div className="container mt-4">
      <input
        type="text"
        placeholder="Search profiles..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {currentProfiles.length > 0 ? (
          currentProfiles.map((profile) => (
            <motion.div
              className="col-12 col-sm-6 col-md-4 mb-4"
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileCard profile={profile} />
            </motion.div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-danger">
              No profiles found matching your search.
            </p>
          </div>
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn ${
              currentPage === index + 1 ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileListing;
