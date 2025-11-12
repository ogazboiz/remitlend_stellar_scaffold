import { Button, Icon, Layout } from "@stellar/design-system";
import ConnectAccount from "./components/ConnectAccount.tsx";
import { ThemeToggle } from "./components/ThemeToggle.tsx";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import Debugger from "./pages/Debugger.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import BorrowerDashboard from "./pages/BorrowerDashboard.tsx";
import LenderDashboard from "./pages/LenderDashboard.tsx";
import VerificationFlow from "./pages/VerificationFlow.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { NotificationProvider } from "./components/NotificationSystem.tsx";

const AppLayout: React.FC = () => {
  const navItems = [
    { key: "verify", path: "/verify", label: "Verify" },
    { key: "borrow", path: "/borrow", label: "Borrow" },
    { key: "lend", path: "/lend", label: "Lend" },
    { key: "admin", path: "/admin", label: "Admin" },
    {
      key: "debug",
      path: "/debug",
      label: "Debug",
      icon: () => <Icon.Code02 size="md" />,
    },
  ];

  const renderNavButtons = (
    variant: React.ComponentProps<typeof Button>["variant"],
    size: React.ComponentProps<typeof Button>["size"],
    buttonClassName?: string,
  ) =>
    navItems.map(({ key, path, label, icon }) => (
      <NavLink key={key} to={path} className="nav-link">
        {({ isActive }) => (
          <Button
            variant={variant}
            size={size}
            disabled={isActive}
            className={[
              icon ? "nav-button--with-icon" : "",
              buttonClassName ?? "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {icon ? <span className="nav-button__icon">{icon()}</span> : null}
            {label}
          </Button>
        )}
      </NavLink>
    ));

  return (
    <main>
      <Layout.Header
        projectId="RemitLend"
        projectTitle="RemitLend"
        contentRight={
          <>
            <nav className="header-nav header-nav--desktop">
              {renderNavButtons("tertiary", "md")}
            </nav>
            <div className="header-controls">
              <ThemeToggle />
              <ConnectAccount />
            </div>
          </>
        }
      />
      <nav className="header-nav header-nav--mobile">
        {renderNavButtons("secondary", "sm", "mobile-nav-button")}
      </nav>
      <Outlet />
      <Layout.Footer>
        <span>
          © {new Date().getFullYear()} RemitLend. Licensed under the{" "}
          <a
            href="http://www.apache.org/licenses/LICENSE-2.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apache License, Version 2.0
          </a>
          .
        </span>
      </Layout.Footer>
    </main>
  );
};

function App() {
  return (
    <NotificationProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/verify" element={<VerificationFlow />} />
          <Route path="/borrow" element={<BorrowerDashboard />} />
          <Route path="/lend" element={<LenderDashboard />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/debug" element={<Debugger />} />
          <Route path="/debug/:contractName" element={<Debugger />} />
        </Route>
      </Routes>
    </NotificationProvider>
  );
}

export default App;
