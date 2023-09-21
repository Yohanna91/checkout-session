import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
const Register = () => {
  const [fullname, setFullname] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const history = useHistory()

  async function handleRegister() {
    const registerUser = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, email, password }),
    })
      .then((res) => history.push("/login"))
      .then((data) => console.log(data));
  }

  return (
    <div className="bg-white p-4 mt-24 mx-2 w-auto md:w-[800px] md:mx-auto">
      <div className="flex flex-col space-y-2">
        <label>Full name</label>
        <input
          className="bg-gray-200 p-2 outline-none"
          type="text"
          name="fullname"
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label>Email</label>
        <input
          className="bg-gray-200 p-2 outline-none"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label>Password</label>
        <input
          className="bg-gray-200 p-2 outline-none"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handleRegister}
        className="bg-purple-500 text-white inline-block mt-4 p-2 w-full"
      >
        Register
      </button>
      <div className="text-center pt-2 underline">
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
};

export default Register;
