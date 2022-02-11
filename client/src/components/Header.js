import React from "react";
import { Link } from "@mui/material/";
import JediLogo from "../assets/jedi-master.jpg";
import PadawanLogo from "../assets/padawan.png";

export default function Header({ title, jediLogin, padawanLogin }) {
  return (
    <header>
      <div className="heading">
        <Link href="/" underline="none">
          <h1>{title}</h1>
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <div>
              <img src={JediLogo} className="user-image" alt="JediMaster" />
              <Link href="/JediMaster" underline="none">
                <h3>{jediLogin}</h3>
              </Link>
            </div>
          </li>
          <li>
            <div>
              <img src={PadawanLogo} className="user-image" alt="Padwan" />
              <Link href="/Padawan" underline="none">
                <h3>{padawanLogin}</h3>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
