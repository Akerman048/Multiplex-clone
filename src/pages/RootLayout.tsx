import React, { FC } from "react";
import { Navigation } from "../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import "../index.css";

export const RootLayout: FC = () => {
  return (
    <div className='container'>
      <header>
        <Navigation />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
