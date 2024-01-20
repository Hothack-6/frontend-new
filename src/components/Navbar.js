import React from "react";
import styles from "../globals.css";
import { Login } from "./Login";

export default function NavBar() {
  return (
    <section>
      <header className="flex justify-between p-4">
        <main className="flex gap-8">
          <img
            src="/logo.png"
            alt="NFTIX logo"
            width={84}
            height={103}
            className="self-start"
          />
          <h3>NFTix</h3>
        </main>
        <Login />
      </header>
      <div className={styles.cyan_thin_border}></div>
    </section>
  );
}
