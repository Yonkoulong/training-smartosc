import React, { PropsWithChildren } from 'react';
import './_navLink.scss';

import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    LinkProps,
    NavLink
} from 'react-router-dom';

type CustomizeNavLinkProps = {
  icon ?: string
} & LinkProps;

export default function CustomizeNavLink(props : PropsWithChildren<CustomizeNavLinkProps>) {
  const { children, icon, ...restLinkProps } = props;

  return (
    <NavLink {...restLinkProps} className="nav-link" activeClassName="nav-link-active">
        {icon ? icon : null}{children}
    </NavLink>
  )
} 
