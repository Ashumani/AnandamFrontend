// import { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import { getEstId } from './pages/Auth/authToken';
// // import "../components/pages/dashboard"
// import { useSidebar } from './SidebarContext'; // Import the context

// const Sidebar = () => {

//     const { showAll } = useSidebar();
//     console.log(showAll)
//     const [side_items, set_side_items] = useState([]);


//       useEffect(() => {
//         const fetchData = async () => {

//           const sidebar =   [
//             {
//                 "show": !showAll ? "hide" : "show",
//                 "mainItem": "Dashboard",
//                 "path": "",
//                 "icon": "bi bi-menu-button-wide"
//             },{
//                 "show": !showAll ? "hide" : "show",
//                 "mainItem": "Master",
//                 "path": "",
//                 "icon": "bi bi-menu-button-wide"
//             },
//             {
//                 "show": !showAll ? "show" : "hide",
//                 "mainItem": "Ragistration",
//                 "path": "",
//                 "icon": "bi bi-menu-button-wide",
//                 "subItems": [
//                     {
//                         "item": "Employer Registration",
//                         "path": "/auth/dashboard/employer",
//                         "icon": "bi bi-briefcase"
//                     },
//                     {
//                         "item": "Employee Registration",
//                         "path": "/auth/dashboard/employee",
//                         "icon": "bi bi-person-fill"
//                     }
//                 ]
//             }, {
//                 "show": !showAll ? "show" : "hide",
//                 "mainItem": "Compliance",
//                 "path": "",
//                 "icon": "bi bi-shield-lock",
//                 "subItems": [
//                     {
//                         "item": "Salary",
//                         "path": "/auth/dashboard/salary",
//                         "icon": "bi bi-currency-rupee"
//                     },
//                     {
//                         "item": "EPF Return",
//                         "path": "/auth/dashboard/summary",
//                         "icon": "bi bi-bank"
//                     },
//                     {
//                         "item": "Esic Return",
//                         "path": "/auth/dashboard/esic",
//                         "icon": "bi bi-house-door"
//                     }
//                 ]
//             }, {
//                 "show": !showAll ? "show" : "hide",
//                 "mainItem": "Form Generation",
//                 "path": "",
//                 "icon": "bi bi-layout-text-window-reverse",
//                 "subItems": [
//                     {
//                         "item": "ECR",
//                         "path": "/auth/dashboard/ecr",
//                         "icon": "bi bi-file-earmark-text"
//                     },
//                     {
//                         "item": "Form 3A/6A",
//                         "path": "/auth/dashboard/form3A6A",
//                         "icon": "bi bi-file-earmark"
//                     }
//                     // ,
//                     // {
//                     //     "item": "Form 5A",
//                     //     "path": "/auth/dashboard/form5A",
//                     //     "icon": "bi bi-circle"
//                     // },
//                     // {
//                     //     "item": "KYCs",
//                     //     "path": "/auth/dashboard/kyc",
//                     //     "icon": "bi bi-circle"
//                     // }
//                 ]
//             }, {
//                 "show": !showAll ? "show" : "hide",
//                 "mainItem": "Invoice Generation",
//                 "path": "",
//                 "icon": "bi bi-wallet-fill",
//                 "subItems": [
//                     {
//                         "item": "Create Invoice",
//                         "path": "/auth/dashboard/bill/create",
//                         "icon": "bi bi-pencil-square"
//                     },
//                     {
//                         "item": "View Invoice",
//                         "path": "/auth/dashboard/bill/billView",
//                         "icon": "bi bi-eye"
//                     }
//                 ]
//             },
//             {
//                 "show": !showAll ? "show" : "hide",
//                 "mainItem": "Downloads",
//                 "path": "",
//                 "icon": "bi bi-download",
//                 "subItems": [
//                     {
//                         "item": "Download",
//                         "path": "/auth/dashboard/form/download",
//                         "icon": "bi bi-download"
//                     }
//                 ]
//             }, {
//                 "show": !showAll ? "show" : "hide",
//                 "mainItem": "Admin",
//                 "path": "",
//                 "icon": "bi bi-person-badge",
//                 "subItems": [
//                     {
//                         "item": "User",
//                         "path": "/auth/dashboard/user",
//                         "icon": "bx bx-user"
//                     },
//                     {
//                         "item": "Blogs",
//                         "path": "/auth/dashboard/blogs",
//                         "icon": "bx bxl-blogger"
//                     },
//                     {
//                         "item": "Inquiries",
//                         "path": "/auth/dashboard/inquiries",
//                         "icon": "bi bi-question-circle"
//                     },
//                     {
//                         "item": "Form",
//                         "path": "/auth/dashboard/form",
//                         "icon": "bi bi-question-circle"
//                     },
//                     {
//                         "item": "Records Delete",
//                         "path": "/auth/dashboard/superUser",
//                         "icon": "bi bi-question-circle"
//                     }
//                 ]
//             },{
//                 "show": showAll ? "hide" : "show",
//                 "mainItem": "Logout",
//                 "path": "",
//                 "icon": "bi bi-menu-button-wide"
//             }]

//             set_side_items(sidebar)
//          console.log(side_items)

//         };

//         fetchData();

//       }, []);


//     return (
//         <>
//            <aside id="sidebar" className="sidebar">
//     <ul className="sidebar-nav" id="sidebar-nav">
//         {side_items.map((item, index) => (
//             item.show === 'show' ? (
//                 <li key={index} className="nav-item">
//                     <a className="nav-link collapsed" data-bs-target={`#components-nav-${index}`} data-bs-toggle="collapse" href="#">
//                         <i className={item.icon}></i>
//                         <span>{item.mainItem}</span>
//                         <i className="bi bi-chevron-down ms-auto"></i>
//                     </a>
//                     {item.subItems && item.subItems.length > 0 && (
//                         <ul id={`components-nav-${index}`} className="nav-content collapse" data-bs-parent="#sidebar-nav">
//                             {item.subItems.map((item1, index1) => (
//                                 <li key={index1}>
//                                     <Link to={item1.path}>
//                                         <i className={item1.icon} style={{ transform: "scale(2.5)" }}></i>
//                                         <span>{item1.item}</span>
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </li>
//             ) : ( (
//                 item.show === 'hide' &&

//                 <li key={index} className="nav-item">
//                     <a className="nav-link" href="#">
//                         <i className={item.icon}></i>
//                         <span>{item.mainItem}</span>
//                     </a>
//                 </li>
//             )
//             )
//         ))}
//     </ul>
// </aside>

//         </>
//     )
// }

// export default Sidebar

import { useState, useEffect } from 'react';
import { getEstId } from './pages/Auth/authToken';
// import "../components/pages/dashboard"
import { useSidebar } from './SidebarContext'; // Import the context
import { Link, useNavigate } from "react-router-dom";
const Sidebar = () => {
    const { showAll } = useSidebar();
    const navigate = useNavigate();
    const [side_items] = useState(
        [{
            "mainItem": "Registration",
            "path": "",
            "icon": "bi bi-menu-button-wide",
            "subItems": [
                {
                    "item": "Employer Registration",
                    "path": "/auth/dashboard/employer",
                    "icon": "bi bi-briefcase"
                },
                {
                    "item": "Employee Registration",
                    "path": "/auth/dashboard/employee",
                    "icon": "bi bi-person-fill"
                }
            ]
        }, {
            "mainItem": "Compliance",
            "path": "",
            "icon": "bi bi-shield-lock",
            "subItems": [
                {
                    "item": "Salary",
                    "path": "/auth/dashboard/salary",
                    "icon": "bi bi-currency-rupee"
                },
                {
                    "item": "EPF Return",
                    "path": "/auth/dashboard/summary",
                    "icon": "bi bi-bank"
                },
                {
                    "item": "Esic Return",
                    "path": "/auth/dashboard/esic",
                    "icon": "bi bi-house-door"
                }
            ]
        }, {
            "mainItem": "Form Generation",
            "path": "",
            "icon": "bi bi-layout-text-window-reverse",
            "subItems": [
                {
                    "item": "ECR",
                    "path": "/auth/dashboard/ecr",
                    "icon": "bi bi-file-earmark-text"
                },
                {
                    "item": "Form 3A/6A",
                    "path": "/auth/dashboard/form3A6A",
                    "icon": "bi bi-file-earmark"
                }
                // ,
                // {
                //     "item": "Form 5A",
                //     "path": "/auth/dashboard/form5A",
                //     "icon": "bi bi-circle"
                // },
                // {
                //     "item": "KYCs",
                //     "path": "/auth/dashboard/kyc",
                //     "icon": "bi bi-circle"
                // }
            ]
        }, {
            "mainItem": "Invoice Generation",
            "path": "",
            "icon": "bi bi-wallet-fill",
            "subItems": [
                {
                    "item": "Create Invoice",
                    "path": "/auth/dashboard/bill/create",
                    "icon": "bi bi-pencil-square"
                },
                {
                    "item": "View Invoice",
                    "path": "/auth/dashboard/bill/billView",
                    "icon": "bi bi-eye"
                }
            ]
        },
        {
            "mainItem": "Downloads",
            "path": "",
            "icon": "bi bi-download",
            "subItems": [
                {
                    "item": "Download",
                    "path": "/auth/dashboard/form/download",
                    "icon": "bi bi-download"
                }
            ]
        }, {
            "mainItem": "Admin",
            "path": "",
            "icon": "bi bi-person-badge",
            "subItems": [
                {
                    "item": "User",
                    "path": "/auth/dashboard/user",
                    "icon": "bx bx-user"
                },
                {
                    "item": "UAN Passbook Agent",
                    "path": "/auth/dashboard/EPFWidget",
                    "icon": "bi bi-question-circle"
                },
                {
                    "item": "UAN Member Agent",
                    "path": "/auth/dashboard/EpfMember",
                    "icon": "bi bi-question-circle"
                }, {
                    "item": "Penalty Calculator",
                    "path": "/auth/dashboard/Calculator",
                    "icon": "bi bi-question-circle"
                },
                {
                    "item": "Blogs",
                    "path": "/auth/dashboard/blogs",
                    "icon": "bx bxl-blogger"
                },
                {
                    "item": "Inquiries",
                    "path": "/auth/dashboard/inquiries",
                    "icon": "bi bi-question-circle"
                }, {
                    "item": "Notification",
                    "path": "/auth/dashboard/notification",
                    "icon": "bi bi-question-circle"
                },
                {
                    "item": "Form",
                    "path": "/auth/dashboard/form",
                    "icon": "bi bi-question-circle"
                },
                {
                    "item": "Records Delete",
                    "path": "/auth/dashboard/superUser",
                    "icon": "bi bi-question-circle"
                },
                {
                    "item": "Parameters",
                    "path": "/auth/dashboard/parameters",
                    "icon": "bi bi-question-circle"
                }
            ]
        }]
    );
    const [isShow] = useState(true);


    const handleLogout = (e) => {
        e.preventDefault(); // Prevents default anchor link behavior

        // 1. Clear session and local storage
        localStorage.clear();
        sessionStorage.clear();

        // 2. Navigate user to login page and replace browser history
        navigate('/login', { replace: true });
    };

    return (
        <>
            <aside id="sidebar" className="sidebar">
               <ul className="sidebar-nav" id="sidebar-nav">

    {/* Dashboard - Always visible */}
    <li className="nav-item">
        <a className="nav-link" href="/auth/dashboard">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
        </a>
    </li>

    {/* Master - Always visible */}
    <li className="nav-item">
        <a className="nav-link" href="/auth/dashboard/master">
            <i className="bi bi-archive"></i>
            <span>Master</span>
        </a>
    </li>

    {/* Other menus - Only when showAll is true */}
    {showAll && side_items
        .filter(item => item.mainItem !== "Admin")
        .map((item, index) => (
            <li key={index} className="nav-item">

                <a
                    className="nav-link collapsed"
                    data-bs-target={`#components-nav-${index}`}
                    data-bs-toggle="collapse"
                    href="#"
                >
                    <i className={item.icon}></i>
                    <span>{item.mainItem}</span>
                    <i className="bi bi-chevron-down ms-auto"></i>
                </a>

                {item.subItems?.length > 0 && (
                    <ul
                        id={`components-nav-${index}`}
                        className="nav-content collapse"
                        data-bs-parent="#sidebar-nav"
                    >
                        {item.subItems.map((item1, index1) => (
                            <li key={index1}>
                                <Link to={item1.path}>
                                    <i
                                        className={item1.icon}
                                        style={{ transform: "scale(2.5)" }}
                                    ></i>
                                    <span>{item1.item}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

            </li>
        ))
    }

    {/* Admin - Always visible */}
    <li className="nav-item">

        <a
            className="nav-link collapsed"
            data-bs-target="#admin-nav"
            data-bs-toggle="collapse"
            href="#"
        >
            <i className="bi bi-person-badge"></i>
            <span>Admin</span>
            <i className="bi bi-chevron-down ms-auto"></i>
        </a>

        <ul
            id="admin-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
        >
            <li>
                <Link to="/auth/dashboard/user">
                    <i className="bx bx-user"></i>
                    <span>User</span>
                </Link>
            </li>

            <li>
                <Link to="/auth/dashboard/EPFWidget">
                    <i className="bi bi-question-circle"></i>
                    <span>UAN Passbook Agent</span>
                </Link>
            </li>

            <li>
                <Link to="/auth/dashboard/EpfMember">
                    <i className="bi bi-question-circle"></i>
                    <span>UAN Member Agent</span>
                </Link>
            </li>

            <li>
                <Link to="/auth/dashboard/Calculator">
                    <i className="bi bi-question-circle"></i>
                    <span>Penalty Calculator</span>
                </Link>
            </li>

            <li>
                <Link to="/auth/dashboard/blogs">
                    <i className="bx bxl-blogger"></i>
                    <span>Blogs</span>
                </Link>
            </li>

            <li>
                <Link to="/auth/dashboard/inquiries">
                    <i className="bi bi-question-circle"></i>
                    <span>Inquiries</span>
                </Link>
            </li>

            <li>
                <Link to="/auth/dashboard/notification">
                    <i className="bi bi-question-circle"></i>
                    <span>Notification</span>
                </Link>
            </li>

            <li>
                <Link to="/auth/dashboard/form">
                    <i className="bi bi-question-circle"></i>
                    <span>Form</span>
                </Link>
            </li>

            <li>
                <Link to="/auth/dashboard/superUser">
                    <i className="bi bi-question-circle"></i>
                    <span>Records Delete</span>
                </Link>
            </li>

            <li>
                <Link to="/auth/dashboard/parameters">
                    <i className="bi bi-question-circle"></i>
                    <span>Parameters</span>
                </Link>
            </li>
        </ul>
    </li>

    {/* Logout - Always visible */}
    <li className="nav-item">
        <a
            href="#logout"
            className="nav-link cursor-pointer"
            onClick={handleLogout}
            role="button"
        >
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
        </a>
    </li>

</ul>
            </aside>
        </>
    )
}
export default Sidebar