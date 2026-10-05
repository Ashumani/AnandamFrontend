import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSidebar } from "./SidebarContext";
import "./sidebar-modern.css";

import logo from "../standalone_assets/images/Anandam.png";

/* =========================================================
   WORKSPACE MENU
========================================================= */

const menuItems = [
  {
    id: "registration",
    title: "Registration",
    icon: "bi bi-person-plus",
    items: [
      {
        title: "Employer Registration",
        path: "/auth/dashboard/employer",
        icon: "bi bi-briefcase",
      },
      {
        title: "Employee Registration",
        path: "/auth/dashboard/employee",
        icon: "bi bi-person",
      },
    ],
  },

  {
    id: "compliance",
    title: "Compliance",
    icon: "bi bi-shield-check",
    items: [
      {
        title: "Salary",
        path: "/auth/dashboard/salary",
        icon: "bi bi-currency-rupee",
      },
      {
        title: "EPF Return",
        path: "/auth/dashboard/summary",
        icon: "bi bi-bank",
      },
      {
        title: "ESIC Return",
        path: "/auth/dashboard/esic",
        icon: "bi bi-hospital",
      },
    ],
  },

  {
    id: "form-generation",
    title: "Form Generation",
    icon: "bi bi-file-earmark-text",
    items: [
      {
        title: "ECR",
        path: "/auth/dashboard/ecr",
        icon: "bi bi-file-earmark-check",
      },
      {
        title: "Form 3A/6A",
        path: "/auth/dashboard/form3A6A",
        icon: "bi bi-file-earmark",
      },
    ],
  },

  {
    id: "invoice-generation",
    title: "Invoice Generation",
    icon: "bi bi-receipt",
    items: [
      {
        title: "Create Invoice",
        path: "/auth/dashboard/bill/create",
        icon: "bi bi-plus-square",
      },
      {
        title: "View Invoice",
        path: "/auth/dashboard/bill/billView",
        icon: "bi bi-eye",
      },
    ],
  },

  {
    id: "downloads",
    title: "Downloads",
    icon: "bi bi-download",
    items: [
      {
        title: "Download",
        path: "/auth/dashboard/form/download",
        icon: "bi bi-cloud-arrow-down",
      },
    ],
  },
];

/* =========================================================
   ADMIN MENU
========================================================= */

const adminItems = [
  {
    title: "User",
    path: "/auth/dashboard/user",
    icon: "bi bi-people",
  },
  {
    title: "UAN Passbook Agent",
    path: "/auth/dashboard/EPFWidget",
    icon: "bi bi-journal-text",
  },
  {
    title: "UAN Member Agent",
    path: "/auth/dashboard/EpfMember",
    icon: "bi bi-person-vcard",
  },
  {
    title: "Penalty Calculator",
    path: "/auth/dashboard/Calculator",
    icon: "bi bi-calculator",
  },
  {
    title: "Blogs",
    path: "/auth/dashboard/blogs",
    icon: "bi bi-pencil-square",
  },
  {
    title: "Inquiries",
    path: "/auth/dashboard/inquiries",
    icon: "bi bi-question-circle",
  },
  {
    title: "Notification",
    path: "/auth/dashboard/notification",
    icon: "bi bi-bell",
  },
  {
    title: "Form",
    path: "/auth/dashboard/form",
    icon: "bi bi-ui-checks-grid",
  },
  {
    title: "Records Delete",
    path: "/auth/dashboard/superUser",
    icon: "bi bi-trash3",
  },
  {
    title: "Parameters",
    path: "/auth/dashboard/parameters",
    icon: "bi bi-sliders",
  },
];

/* =========================================================
   SIDEBAR
========================================================= */

const Sidebar = () => {
  const { showAll } = useSidebar();

  const navigate = useNavigate();

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.clear();
    sessionStorage.clear();

    navigate("/login", {
      replace: true,
    });
  };

  /* =======================================================
     BOOTSTRAP ACCORDION SECTION
  ======================================================= */

  const renderSection = (section, index = 0) => {
    const accordionId = `sidebar-${section.id || section.title
      .toLowerCase()
      .replace(/\s+/g, "-")}-${index}`;

    return (
      <div
        className="accordion sidebar-bootstrap-accordion"
        id="sidebarAccordion"
        key={accordionId}
      >
        <div className="accordion-item">

          {/* =================================================
              ACCORDION HEADER
          ================================================= */}

          <h2
            className="accordion-header"
            id={`${accordionId}-heading`}
          >
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${accordionId}-collapse`}
              aria-expanded="false"
              aria-controls={`${accordionId}-collapse`}
            >

              <span className="sidebar-menu-left">

                <span className="sidebar-menu-icon">
                  <i className={section.icon}></i>
                </span>

                <span>{section.title}</span>

              </span>

            </button>
          </h2>

          {/* =================================================
              ACCORDION BODY
          ================================================= */}

          <div
            id={`${accordionId}-collapse`}
            className="accordion-collapse collapse"
            aria-labelledby={`${accordionId}-heading`}
            data-bs-parent="#sidebarAccordion"
          >

            <div className="accordion-body">

              <div className="sidebar-submenu-list">

                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `sidebar-submenu-link ${
                        isActive ? "active" : ""
                      }`
                    }
                  >

                    <span className="submenu-icon">
                      <i className={item.icon}></i>
                    </span>

                    <span>{item.title}</span>

                  </NavLink>
                ))}

              </div>

            </div>

          </div>

        </div>
      </div>
    );
  };

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <aside
      id="sidebar"
      className="sidebar-modern"
    >

      {/* ===================================================
          BRAND
      =================================================== */}

      <div className="sidebar-brand">
  <Link
    to="/auth/dashboard"
    className="brand-link"
  >
    <span className="brand-text">

      <span className="brand-logo-wrapper">
        <img
          className="main_logo"
          src={logo}
          alt="Anandam"
        />
      </span>

      <small>
        MANAGEMENT PORTAL
      </small>

    </span>
  </Link>
</div>

      <div className="sidebar-divider"></div>

      {/* ===================================================
          SIDEBAR SCROLL
      =================================================== */}

      <div className="sidebar-scroll">

        <div className="sidebar-label">
          MAIN MENU
        </div>

        <ul className="sidebar-nav-modern">

          {/* =================================================
              DASHBOARD
          ================================================= */}

          <li>

            <NavLink
              to="/auth/dashboard"
              end
              className={({ isActive }) =>
                `sidebar-main-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <span className="sidebar-menu-icon">
                <i className="bi bi-grid-1x2-fill"></i>
              </span>

              <span>Dashboard</span>

            </NavLink>

          </li>

          {/* =================================================
              MASTER
          ================================================= */}

          <li>

            <NavLink
              to="/auth/dashboard/master"
              className={({ isActive }) =>
                `sidebar-main-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <span className="sidebar-menu-icon">
                <i className="bi bi-collection"></i>
              </span>

              <span>Master</span>

            </NavLink>

          </li>

          {/* =================================================
              WORKSPACE
          ================================================= */}

          {showAll && (
            <>

              <li className="sidebar-label section-label">
                WORKSPACE
              </li>

              {menuItems.map((section, index) =>
                renderSection(section, index)
              )}


            </>
          )}

          
              {/* =================================================
                  ADMINISTRATION
              ================================================= */}

              <li className="sidebar-label section-label">
                ADMINISTRATION
              </li>

              {renderSection(
                {
                  id: "admin",
                  title: "Admin",
                  icon: "bi bi-person-badge",
                  items: adminItems,
                },
                100
              )}

        </ul>

      </div>

      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <div className="sidebar-bottom">

        <div className="sidebar-help">

          <div className="help-icon">
            <i className="bi bi-headset"></i>
          </div>

          <div>
            <strong>Need help?</strong>
            <span>Contact support</span>
          </div>

        </div>

        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
        >

          <span>
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </span>

          <i className="bi bi-chevron-right"></i>

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;