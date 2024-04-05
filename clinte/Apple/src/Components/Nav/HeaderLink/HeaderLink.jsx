import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

export default class HeaderLink extends Component {
  render() {
    return (
      <div>
          <li className="nav-item">
            <NavLink
              to={this.props.linkUrl}
              activeClassName="active"
              className="nav-link js-scroll-trigger"
            >
              {this.props.linkName}
            </NavLink>
        </li>
      </div>
    )
  }
}
