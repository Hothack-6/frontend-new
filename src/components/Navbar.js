import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "../globals.css";
import { Login } from "./Login";

export default function NavBar() {
  return (
    <section>
      <header className="flex justify-between items-center p-4">
        <main className="flex items-center gap-8">
          <Link to="/"> {/* Use Link to wrap the logo and text */}
            <img
              src="/logo.png"
              alt="NFTIX logo"
              width={84}
              height={103}
              className="self-start"
            />

          </Link>
          <Link to="/"> {/* Use Link to wrap the logo and text */}
          <h3 className="navbarTitle">NFTix</h3>
          </Link>
        </main>
        <Login />
      </header>
      <div className={styles.cyan_thin_border}></div>
    </section>
  );
}
