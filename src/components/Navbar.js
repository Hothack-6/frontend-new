import React from "react";
import styles from "../globals.css";
import { Login } from "./Login";

export default function NavBar() {
  return (
    <section>
      <header className="flex justify-between items-center p-4">
        <main className="flex items-center gap-8">
          <img
            src="/logo.png"
            alt="NFTIX logo"
            width={84}
            height={103}
            className="self-start"
          />
          <h3 className="navbarTitle">NFTix</h3>
        </main>
        <Login />
      </header>
      <div className={styles.cyan_thin_border}></div>
    </section>
  );
}
