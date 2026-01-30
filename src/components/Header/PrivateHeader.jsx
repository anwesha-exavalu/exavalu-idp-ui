import React, { useState, useRef, useEffect } from "react";
import { PrivateHeaderstyled } from "../../styles/components/Header";
import strlogo from "../../assets/images/logo.png";
import productmanagericon from "../../assets/images/productmanagericon.png";
import { Input } from "antd";
import {
  BellOutlined,
  SearchOutlined,
  DownOutlined,
  MenuOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import PMlogo from "../../assets/images/pm_logo.png";
import CMlogo from "../../assets/images/profile-logo.png";
import { signOut } from "../../service/auth/index";
import { useNavigate } from "react-router-dom";
import advisoricon from "../../assets/images/advisoricon.png"
import governanceicon from "../../assets/images/governanceicon.png"
import SLlogo from "../../assets/images/SLlogo.png"
import { useDispatch } from "react-redux";
import { resetExtractionProgress } from "../../features/Extraction-slice/extractionProgressSlice";
import { resetProgressState } from "../../features/progress-submission/ProgressSubmissionSlice";
import axios from "axios";

const PrivateHeader = ({ isMobile }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const role = useSelector((state) => state.user.role);
  const gender = useSelector((state) => state.user.gender);
  const name = useSelector(
    (state) => state.user.firstname + " " + state.user.lastname
  );
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submissionId = useSelector((state) => state.progressSubmission.submissionId);
  const formatRole = (role) => {
    if (!role) return "";
    if (role.toLowerCase() === "projectmanager") return "Project Manager";
    if (role.toLowerCase() === "clientmanager") return "";
    if (role.toLowerCase() === "seniorleader") return "Senior Leader";
    if (role.toLowerCase() === "productmanager") return "Product Leader";
    if (role.toLowerCase() === "advisor") return "Advisor/Wholesaler";
    if (role.toLowerCase() === "admin") return "Admin";
    if (role.toLowerCase() === "governance") return "Governance Approver";
    return role
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(/[\s_]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const displayrole = formatRole(role);

  // const handleLogout = () => {
  //   signOut();
  //   dispatch(resetExtractionProgress());
  //   dispatch(resetProgressState());
  //   const submissionskip = ["ac1e746519d0454ca6fec7fe6a4c9e83", "5ef4443b36d948e7a7ec333cda038f5d", "dd101fbe92d74c3b878323332bb8949f"]
    
  //   if (submissionId && !submissionskip.includes(submissionId)) {
  //     const response = axios.post(
  //       `${import.meta.env.VITE_AI_QUERY}/chatbox/delete?submission_id=${submissionId}`
  //     );
  //     console.log("response", response)
  //   }

      
  //     navigate("/");
  //   };

  const handleLogout = () => {
    signOut();
    dispatch(resetExtractionProgress());
    dispatch(resetProgressState());
    
    const response = axios.post(
      `${import.meta.env.VITE_AI_QUERY}/chatbox/delete`
    );
    console.log("response", response)

      
      navigate("/");
    };

    const handleMenuClick = (path) => {
      navigate(path);
      setShowMenu(false);
    };

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target) &&
          menuRef.current &&
          !menuRef.current.contains(e.target)
        ) {
          setShowDropdown(false);
          setShowMenu(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <PrivateHeaderstyled>
        <div className="public-header">
          <div className="public-left-section">
            <div className="public-logo">
              <img src={strlogo} alt="Logo" className="public-logo" />
            </div>
          </div>

          <div className="search-section">
            {isMobile && (
              <div
                onClick={() => setShowMenu(!showMenu)}
                style={{ cursor: "pointer", marginRight: 12, marginTop: -10 }}
              >
                <MenuOutlined style={{ fontSize: 20, color: "#000" }} />
              </div>
            )}
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search here..."
              className="search-input"
            />
          </div>

          <div className="profile-section">
            <div className="bell-wrapper">
              <BellOutlined className="notification-icon" />
              <span className="notification-dot" />
            </div>

            <div
              className="profile-info"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {role?.toLowerCase() === "seniorleader" ? (
                <img
                  src={SLlogo}
                  alt="seniorleader Logo"
                  className="dropdown-avatar"
                  style={{ marginTop: 5 }}
                />
              ) :
                role?.toLowerCase() === "governance" ? (
                  <img
                    src={governanceicon}
                    alt="Governance Logo"
                    className="dropdown-avatar"
                    style={{ marginTop: 5 }}
                  />
                ) :
                  role?.toLowerCase() === "advisor" ? (
                    <img
                      src={advisoricon}
                      alt="Advisor Logo"
                      className="dropdown-avatar"
                      style={{ marginTop: 5 }}
                    />
                  ) : role?.toLowerCase() === "productmanager" ? (
                    <img
                      src={productmanagericon}
                      alt="Product Manager Logo"
                      className="dropdown-avatar"
                      style={{ marginTop: 5 }}
                    />
                  ) : gender === "male" ? (
                    <img
                      src={PMlogo}
                      alt="Male Profile"
                      className="dropdown-avatar"
                      style={{ marginTop: 5 }}
                    />
                  ) : (
                    <img
                      src={CMlogo}
                      alt="Other Logo"
                      className="dropdown-avatar"
                      style={{ marginTop: 5 }}
                    />
                  )}


              <div className="text-info">
                <span className="name" style={{ textTransform: "capitalize" }}>
                  {name}
                  {showDropdown ? (
                    <UpOutlined className="down-icon" />
                  ) : (
                    <DownOutlined className="down-icon" />
                  )}
                </span>
                <span className="role">{displayrole}</span>
              </div>
            </div>

            {showDropdown && (
              <div className="custom-dropdown" ref={dropdownRef}>
                <div className="dropdown-header" />
                {role?.toLowerCase() === "seniorleader" ? (
                  <img
                    src={SLlogo}
                    alt="seniorleader Logo"
                    className="dropdown-avatar"
                  />
                ) : role?.toLowerCase() === "governance" ? (
                  <img
                    src={governanceicon}
                    alt="Governance Logo"
                    className="dropdown-avatar"
                  />
                ) :
                  role?.toLowerCase() === "advisor" ? (
                    <img
                      src={advisoricon}
                      alt="Advisor"
                      className="dropdown-avatar"
                    />
                  ) : role?.toLowerCase() === "productmanager" ? (
                    <img
                      src={productmanagericon}
                      alt="Product Manager"
                      className="dropdown-avatar"
                    />
                  ) : gender === "male" ? (
                    <img
                      src={PMlogo}
                      alt="Profile"
                      className="dropdown-avatar"
                    />
                  ) : (
                    <img
                      src={CMlogo}
                      alt="Other Logo"
                      className="dropdown-avatar"
                    />
                  )}


                <div className="dropdown-role">{displayrole}</div>
                <button className="signout-btn" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {showMenu && isMobile && (
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              top: "50px", // distance from top of hamburger
              left: 200,
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "12px 0",
              width: "220px",
              zIndex: 1000,
            }}
          >
            <div
              className="menu-item"
              onClick={() => handleMenuClick("/dashboard")}
            >
              Dashboard
            </div>
          </div>
        )}
      </PrivateHeaderstyled>
    );
  };

  export default PrivateHeader;
