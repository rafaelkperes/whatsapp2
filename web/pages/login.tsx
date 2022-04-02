import { NextPage } from "next";
import React from "react";
import LoginForm from "../components/auth/LoginForm";
import Main from "../layouts/Main";

const Login: NextPage = () => {
  return (
    <Main pageTitle="Login">
      <LoginForm />
    </Main>
  );
};

export default Login;
