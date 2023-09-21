import { Link } from "react-router-dom"
import LoginCheck from "../components/LoginCheck"
import React from "react"
function Success()  {
  return (
    <LoginCheck>
    <div className="h-screen flex justify-center items-center">
        <div className="bg-white p-4 w-[400px] break-words">
        Tack för din beställning.<br /> Det kan ta 2-3 arbetsdagar tills du får din leverans.
        <button className="bg-purple-600 text-white p-2 block mt-4">
            <Link to="/">
            Gå tillbaka till shoppen
            </Link>
        </button>
        </div>
    </div> 
    </LoginCheck>
  )
}

export default Success