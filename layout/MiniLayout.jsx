import React from "react";
import { Outlet } from "react-router-dom";

const MiniLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MiniLayout;
