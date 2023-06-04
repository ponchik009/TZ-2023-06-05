import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../hooks/storeHooks";
import { selectCredentials } from "../../store/whatsappSlice";

export const ProtectedRoute = () => {
  const { idInstance } = useAppSelector(selectCredentials);

  return idInstance && idInstance.length ? (
    <Outlet />
  ) : (
    // <Outlet />
    <Navigate to="/login" />
  );
};
