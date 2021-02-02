import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/formula-1-logo.svg";
import styled from "styled-components";
import { links } from "../utils/constants";

const Navbar = () => {
  return (
    <NavWrapper>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="formula1" />
          </Link>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </NavWrapper>
  );
};

const NavWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;

  .nav-center {
    display: grid;
    grid-template-columns: 3fr 1fr;
    align-items: center;
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }

  .nav-toggle {
    display: none;
  }

  .nav-links {
    display: flex;
    justify-content: center;
    li {
      margin: 0 0.5rem;
    }
    a {
      font-size: 1rem;
      text-transform: capitalize;
      letter-spacing: 0.1rem;
      padding: 0.5rem;
      &:hover {
        border-bottom: 2px solid;
      }
    }
  }
`;

export default Navbar;
