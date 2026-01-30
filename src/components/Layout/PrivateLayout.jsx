import React, { useEffect, useState, useRef } from "react";
import { Layout, Menu, Drawer, Button, Row, Col } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

//import dashboardIcon from "../../assets/svg/dashboard_logo.svg";
import intelliganceIcon from "../../assets/svg/intelligance_logo.svg";
import approvalIcon from "../../assets/svg/approval-logo.svg";
import planIcon from "../../assets/svg/plan_logo.svg";
import productIcon from "../../assets/svg/product_logo.svg";
import productoffericon from "../../assets/images/productoffersicon.png";
import Vector from "../../assets/svg/Vector.svg";
import PrivateHeader from "../Header/PrivateHeader";
import toggleicon from "../../assets/images/toggle_icon.png";
import { useSelector } from "react-redux";
import IRouteS from "../../constants/routes";
import PrivateFooter from "../Footer/PrivateFooter";
import FloatingExtractor from "../../pages/UploadFileContents/FloatingExtractionWidget";
const { Sider, Content, Header } = Layout;

const PrivateLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const role = useSelector((state) => state.user.role);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [openChat, setOpenChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const chatWrapperRef = useRef(null);
 const extractionprogress = useSelector(
   (state) => state.extractionProgress
 );

 useEffect(() => {
   console.log("Redux extractionProgressprivate:", extractionprogress);
 }, [extractionprogress]);

  const toggleChat = () => setOpenChat(!openChat);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const closeDrawer = () => setDrawerVisible(false);

  const handleMenuClick = ({ key }) => {
    navigate(key);
    closeDrawer();
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatWrapperRef.current &&
        !chatWrapperRef.current.contains(event.target)
      ) {
        setOpenChat(false); // just hide, do not reset
      }
    };
    if (openChat) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openChat]);

  const handleChatClose = () => {
    setChatMessages([]);
    setOpenChat(false);
  };

  const iconLabel = (iconSrc, text, isActive) =>
    collapsed && !isMobile ? (
      <img
        src={iconSrc}
        alt={text}
        style={{
          width: 18,
          height: 18,
          filter: isActive ? "none" : "grayscale(100%) brightness(1.3)",
        }}
      />
    ) : (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src={iconSrc}
          alt={text}
          style={{
            width: 18,
            height: 18,
            filter: isActive ? "none" : "grayscale(100%) brightness(1.3)",
          }}
        />
        <span
          style={{
            color: isActive ? "#006172" : "#4A4A4B",
            fontWeight: isActive ? 700 : 600,
            fontSize: 14,
          }}
        >
          {text}
        </span>
      </div>
    );
  const roleRoutes = (IRouteS[role] || []).filter((r) => r.path && !r.disabled);
  const allowedPaths = roleRoutes.map((r) => r.path);
  const hideSidebarRoutes = [];
  let menuItems = [];
   menuItems = [
      // {
      //   key: "/dashboard",
      //   label: iconLabel(
      //     dashboardIcon,
      //     "Dashboard",
      //     currentPath === "/dashboard"
      //   ),
      // },
      {
        key: "/dashboard",
        label: iconLabel(
          intelliganceIcon,
          "Dashboard",
          currentPath === "/dashboard"
        ),
        disabled: !allowedPaths.includes("/dashboard"),
      },
    ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 60,
            borderBottom: "1px solid #e0e0e0",
            position: "fixed",
            zIndex: 100,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {isMobile && (
              <MenuOutlined
                onClick={toggleDrawer}
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            )}
          </div>

          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <PrivateHeader isMobile={isMobile} />
          </div>
        </Header>

        {!isMobile && !hideSidebarRoutes.includes(currentPath) && (
          <Sider
            collapsible
            collapsed={collapsed}
            trigger={null}
            width={220}
            style={{
              background: "#fff",
              borderRight: "1px solid #e0e0e0",
              marginTop: 60,
              position: "fixed",
              height: "100vh",
              zIndex: 10,
            }}
          >
            <div
              style={{ padding: 10, textAlign: collapsed ? "center" : "right" }}
            >
              <Button
                type="text"
                icon={
                  <img
                    src={collapsed ? toggleicon : toggleicon}
                    alt="menu toggle"
                    style={{ width: "16px", height: "12px" }}
                  />
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{ boxShadow: "none", outline: "none" }}
              />
            </div>

            <Menu
              mode="inline"
              selectedKeys={[currentPath]}
              onClick={handleMenuClick}
              items={menuItems}
              style={{ background: "transparent" }}
            />
          </Sider>
        )}

        {isMobile && !hideSidebarRoutes.includes(currentPath) && (
          <Drawer
            title="Menu"
            placement="left"
            onClose={closeDrawer}
            open={drawerVisible}
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              mode="inline"
              selectedKeys={[currentPath]}
              onClick={handleMenuClick}
              items={menuItems}
            />
          </Drawer>
        )}

        <Layout
          style={{
            marginTop: 10,
            marginLeft: hideSidebarRoutes.includes(currentPath)
              ? 0
              : isMobile
                ? 0
                : collapsed
                  ? 80
                  : 220,
            background: "#FAFBFC",
            transition: "all 0.2s ease",
          }}
        >
          <Content style={{ padding: 24 }}>{children}</Content>
          {!hideSidebarRoutes.includes(currentPath) && <PrivateFooter />}

        </Layout>
        {currentPath !== "/upload-file" && (
          <>
        
         <FloatingExtractor data={extractionprogress}/>
         </>
        )}
        
      </Layout>
    </>
  );
};

export default PrivateLayout;
