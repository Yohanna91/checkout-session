import { Link, useHistory } from "react-router-dom"
import { useState } from "react"
const Login = () => {
  const [email, setEmail] = useState<String>("")
  const [password, setPassword] = useState<String>("")

  const history = useHistory();
  
  async function handleLogin(): Promise<any> {
    const loginUser = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    const response = await loginUser.json()
    const { signedIn } = await response
    
    // If the user signed in successfully save it to localStorage
    if (signedIn) {
      localStorage.setItem("signedIn", signedIn)
      location.href = "/"
    }
  }
  return (
    <div className="bg-white p-4 mt-24 mx-2 w-auto md:w-[800px] md:mx-auto">
    <div className="flex flex-col space-y-2">
      <label>Email</label>
      <input
        className="bg-gray-200 p-2 outline-none"
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="flex flex-col space-y-2">
      <label>Password</label>
      <input
        className="bg-gray-200 p-2 outline-none"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
      <button onClick={handleLogin} className="bg-purple-500 text-white inline-block mt-4 p-2 w-full">Log in</button>
      <div className="text-center pt-2 underline">
      <Link to="/register">Create a new account</Link>
      </div>
    </div>
  )
}


export default Login