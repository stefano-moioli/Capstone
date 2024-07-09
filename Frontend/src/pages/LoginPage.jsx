import React from "react";
import LoginForm from "../components/authentication/LoginForm";

export default function LoginPage(){
    return (
      <div className="text-center mt-5">
        <h1>Login</h1>
        <LoginForm />
      </div>
    );
      
  }