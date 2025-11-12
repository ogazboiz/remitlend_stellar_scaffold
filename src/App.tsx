import { Icon, Layout } from "@stellar/design-system";
import { useEffect, useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
    return undefined;
  }, [isMenuOpen]);

  const handleLinkClick = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <main>
      <Layout.Header
        projectId="RemitLend"
        projectTitle="RemitLend"
        contentRight={
          <div className="header-right">
            <button
              type="button"
              className="header-menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <Icon.Menu01 size="lg" />
            </button>
            <div className={`header-collapsible ${isMenuOpen ? "open" : ""}`}>
              <nav className="header-nav">
                <NavLink
                  to="/verify"
                  className="header-link"
                  onClick={handleLinkClick}
                >
                  {({ isActive }) => (
                    <div
                      className={`header-menu-item ${isActive ? "active" : ""}`}
                    >
                      Verify
                    </div>
                  )}
                </NavLink>
                <NavLink
                  to="/borrow"
                  className="header-link"
                  onClick={handleLinkClick}
                >
                  {({ isActive }) => (
                    <div
                      className={`header-menu-item ${isActive ? "active" : ""}`}
                    >
                      Borrow
                    </div>
                  )}
                </NavLink>
                <NavLink
                  to="/lend"
                  className="header-link"
                  onClick={handleLinkClick}
                >
                  {({ isActive }) => (
                    <div
                      className={`header-menu-item ${isActive ? "active" : ""}`}
                    >
                      Lend
                    </div>
                  )}
                </NavLink>
                <NavLink
                  to="/admin"
                  className="header-link"
                  onClick={handleLinkClick}
                >
                  {({ isActive }) => (
                    <div
                      className={`header-menu-item ${isActive ? "active" : ""}`}
                    >
                      Admin
                    </div>
                  )}
                </NavLink>
                <NavLink
                  to="/debug"
                  className="header-link"
                  onClick={handleLinkClick}
                >
                  {({ isActive }) => (
                    <div
                      className={`header-menu-item ${isActive ? "active" : ""}`}
                    >
                      <Icon.Code02 size="sm" />
                      Debug
                    </div>
                  )}
                </NavLink>
              </nav>
              <div className="header-actions">
                <ThemeToggle />
                <ConnectAccount />
              </div>
            </div>
          </div>
        }
      />
      {isMenuOpen && (
        <div className="header-menu-backdrop" onClick={toggleMenu} />
      )}
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
