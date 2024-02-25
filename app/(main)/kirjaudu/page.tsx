import LoginPage from "@/components/LoginPage";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Kirjaudu | Laulutunkki",
};

const Login = () => {
  return <LoginPage />;
};

export default Login;
