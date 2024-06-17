import { useState } from 'react';
import { Link } from "react-router-dom";

// import "../components/pages/dashboard"


const Sidebar = () => {

    const [side_items] = useState(
        [{
            "mainItem": "Master",
            "path": "",
            "icon": "bi bi-menu-button-wide",
            "subItems": [
                {
                    "item": "Employeer Registration",
                    "path": "/auth/dashboard/employer",
                    "icon": "bi bi-circle"
                },
                {
                    "item": "Employee Registration",
                    "path": "/auth/dashboard/employee",
                    "icon": "bi bi-circle"
                }
            ]
        }, {
            "mainItem": "Transaction",
            "path": "",
            "icon": "bi bi-journal-text",
            "subItems": [
                {
                    "item": "EPF Return",
                    "path": "/auth/dashboard/monthlypf",
                    "icon": "bi bi-circle"
                },
                {
                    "item": "EPF Summary",
                    "path": "/auth/dashboard/summary",
                    "icon": "bi bi-circle"
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
                    "icon": "bi bi-circle"
                },
                {
                    "item": "Form 3A/6A",
                    "path": "/auth/dashboard/form3A6A",
                    "icon": "bi bi-circle"
                },
                {
                    "item": "Form 5A",
                    "path": "/auth/dashboard/form5A",
                    "icon": "bi bi-circle"
                },
                {
                    "item": "KYCs",
                    "path": "/auth/dashboard/kyc",
                    "icon": "bi bi-circle"
                }
            ]
        }, {
            "mainItem": "Billing",
            "path": "",
            "icon": "bi bi-bar-chart",
            "subItems": [
                {
                    "item": "Create Bill",
                    "path": "/auth/dashboard/bill/create",
                    "icon": "bi bi-circle"
                },
                {
                    "item": "View Bill",
                    "path": "/auth/dashboard/kyc",
                    "icon": "bi bi-circle"
                }
            ]
        }]
    );

    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <a className="nav-link " href="/auth/dashboard">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    {side_items.map((item, index) => (
                        <li key={index} className="nav-item">
                            <a className="nav-link collapsed" data-bs-target={`#components-nav-${index}`} data-bs-toggle="collapse" href="#">
                                <i className={item.icon}></i>
                                <span>{item.mainItem}</span>
                                <i key={index} className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            {item.subItems.map((item1, index1) => (
                                <ul key={index1} id={`components-nav-${index}`} className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                    <li>
                                        <Link to={item1.path}>
                                            <i className={item1.icon}></i><span>{item1.item}</span>
                                        </Link>
                                    </li>
                                </ul>
                            ))}
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    )
}

export default Sidebar