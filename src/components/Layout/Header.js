import React, { useState } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../../styles/Header.css";
import SellButton from "../../assets/SellButton";
import "../../styles/Header.css";
import { DocumentReference } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    console.log("search field is : ", search);
    navigate(`/search/${search}`);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-sm-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Campus OLX for <img src="/iitglogo.png" alt="iitglogo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <FaBars />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mr-0">
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${({ isActive }) =>
                    isActive ? "active" : "inactive"}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <div>
                  <input
                    type="text"
                    placeholder="Search for a product"
                    value={search}
                    onChange={handleInputChange}
                  />
                  <button onClick={handleSearch}>Search</button>
                </div>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${({ isActive }) =>
                    isActive ? "active" : "inactive"}`}
                  to="/myProducts"
                >
                  My Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${({ isActive }) =>
                    isActive ? "active" : "inactive"}`}
                  to="/profile"
                >
                  Profile
                  {/* <img src="/usericon.png" id="usericon" /> */}
                </NavLink>
              </li>
              <li className="" id="sellNav">
                <NavLink
                  className={`nav-link ${({ isActive }) =>
                    isActive ? "active" : "inactive"}`}
                  to="/create-listing"
                >
                  <div className="sellMenu">
                    <SellButton></SellButton>
                    <div className="sellMenuContent">
                      <a href="/create-listing">SELL</a>
                    </div>
                  </div>
                  {/* <img src="/usericon.png" id="usericon" /> */}
                </NavLink>
              </li>
              {/* <div className="sellMenu">
                <SellButton></SellButton>
                <div className="sellMenuContent">
                  <a href="/create-listing">SELL</a>
                </div>
              </div> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
