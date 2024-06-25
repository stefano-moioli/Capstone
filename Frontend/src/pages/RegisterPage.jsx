import React from "react";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage(){
    return (
      <div className="text-center mt-5">
        <h1>Registrati</h1>
        <p>Questa è la pagina per registrarsi!!</p>
        <RegisterForm />
      </div>
    );
      
  }