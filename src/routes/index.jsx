import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PublicLayout from "../components/Layout/PublicLayout";
import PrivateLayout from "../components/Layout/PrivateLayout";
import routes from "constants/routes";

import { useIsFetching, useIsMutating } from "react-query";
import { Spin } from "antd";

import useLoader, { LoaderProvider } from "context/loader";
import { ScrollSyncProvider } from "./../context/ScrollSyncContext";

export const RenderRoutes = () => {
  const role = useSelector((state) => state.user?.role);
  const publicRoutes = routes["UN_AUTH_ROUTES"] || [];
  const roleRoutes = routes[role] || [];
  const allRoutes = [...publicRoutes, ...roleRoutes];
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const { loader, setLoader } = useLoader();

  useEffect(() => {
    if (isFetching || isMutating) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [isFetching, isMutating]);

  return (
    <Routes>
      {allRoutes.map((route, index) => {
        const { component: Component, path, restricted, children } = route;
        const Layout = restricted ? PrivateLayout : PublicLayout;

        return (
          <Route
            key={index}
            path={path}
            element={
              <Layout>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      filter: loader ? "blur(5px)" : "none",
                      transition: "filter 0.3s ease",
                    }}
                  >
                    <Component />
                  </div>

                  {loader && (
                    <div className="overlayStyle">
                      <div
                        style={{
                          position: "fixed",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: "9999",
                        }}
                        className="loader-container"
                      >
                        <Spin
                          className={`${loader && "custom-loader"}`}
                          size="large"
                          spinning={loader}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Layout>
            }
          >
            {children?.map((child, childIdx) => {
              const ChildComponent = child.component;
              if (child.index) {
                return (
                  <Route key={childIdx} index element={<ChildComponent />} />
                );
              }
              return (
                <Route
                  key={childIdx}
                  path={child.path}
                  element={<ChildComponent />}
                />
              );
            })}
          </Route>
        );
      })}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const AppRoutes = () => {
  return (
    <LoaderProvider>
      <ScrollSyncProvider>
        <RenderRoutes />
      </ScrollSyncProvider>
    </LoaderProvider>
  );
};

export default AppRoutes;