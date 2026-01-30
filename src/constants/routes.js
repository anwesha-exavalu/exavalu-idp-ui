import Login from "../pages/Login/index.jsx";
import DashboardCM from "../pages/Dashboard/DashboardCM.jsx";
import UploadFileScreen from "../pages/UploadFileContents/UploadFileScreen.jsx";
import DocumentInventoryViewer from "../subfeatures/DocumentInventoryMaster/DocumentInventoryViewer.jsx";

export const ClientManagerDashboardRoute = {
  component: DashboardCM,
  path: "/dashboard",
  restricted: true,
  disabled: false,
};
export const LoginRoute = {
  component: Login,
  path: "/",
  restricted: false,
  disabled: false,
};
export const UploadFileRoute = {
  component: UploadFileScreen,
  path: "/upload-file",
  restricted: true,
  disabled: false,
};

export const DocumentInventoryViewerRoute = {
  component: DocumentInventoryViewer,
  path: "/document/:documentInventoryId",
  restricted: true,
  disabled: false,
};

const IRouteS = {
  UN_AUTH_ROUTES: [LoginRoute],
  clientmanager: [
    ClientManagerDashboardRoute,
    UploadFileRoute,
    DocumentInventoryViewerRoute
  ]
};

export default IRouteS;
