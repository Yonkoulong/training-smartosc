import "./_sidebar.scss";
import React from "react";
import CustomizeNavLink from "../NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faTableList,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

type RouterLink = {
  id: string;
  label: string;
  to: string;
  icon?: any;
};

const routerLinks: RouterLink[] = [
  {
    id: "dishes-link",
    label: "Dishes Management",
    to: "/admin/dishes-management",
    icon: <FontAwesomeIcon icon={faUtensils} />,
  },
  {
    id: "tables-link",
    label: "Tables Management",
    to: "/admin/tables-management",
    icon: <FontAwesomeIcon icon={faTableList} />,
  },
  {
    id: "reservation-link",
    label: "Reservation Management",
    to: "/admin/reservation-management",
    icon: <FontAwesomeIcon icon={faClipboard} />,
  },
];

export default function Sidebar() {
  return (
    <div className="side-bar">
      <div className="nav-bar">
        <ul className="nav-list">
          {routerLinks.map((link) => {
            return (
              <li key={link.id} className="nav-item">
                <CustomizeNavLink
                  to={link.to}
                  icon={link.icon}
                >
                  {link.label}
                </CustomizeNavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
