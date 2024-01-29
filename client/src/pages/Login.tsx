import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useHistory();

  useEffect(() => {
    if (Boolean(localStorage.getItem("signedin"))) {
      navigate.push("/");
    }
  }, []);

  function login() {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          localStorage.setItem("signedin", true);
          localStorage.setItem("currentUser", email);
          navigate.push("/");
        }
      });
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
      <Button text="Login" onClickHandler={login} />
      <Link to="/register" className="block underline text-yellow-900">
        Go to register
      </Link>
    </div>
  );
};

export default Login;
