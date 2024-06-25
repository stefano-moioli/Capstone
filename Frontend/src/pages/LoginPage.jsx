import React from "react";
import LoginForm from "../components/LoginForm";

export default function LoginPage(){
    return (
      <div className="text-center mt-5">
        <h1>Login</h1>
        <p>Questa è la pagina di login</p>
        <LoginForm />
      </div>
    );
      
  }