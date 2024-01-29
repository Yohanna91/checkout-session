import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useHistory();

  useEffect(() => {
    if (Boolean(localStorage.getItem("signedin"))) {
      navigate.push("/");
    }
  }, []);

  function register() {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    location.href = "/login";
  }
  return (
    <div className="bg-white w-[400px] mx-auto mt-12 space-y-4 p-4">
      <Input
        onChangeHandler={(e) => setEmail(e.target.value)}
        type="email"
        label="Email"
        placeholder="john@example.com"
      />
      <Input
        onChangeHandler={(e) => setPassword(e.target.value)}
        type="password"
        label="Password"
        placeholder="****"
      />
      <Button text="Register" onClickHandler={register} />
      <Link to="/login" className="block underline text-yellow-900">
        Go to login
      </Link>
    </div>
  );
};

export default register;
