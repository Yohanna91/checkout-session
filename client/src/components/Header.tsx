import {FC} from "react"
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState, useContext} from "react"
import AppContext from "../context/appContext"

const Header: FC = () => {
    const value = useContext(AppContext)
    const [signedIn, setSignedIn] = useState<Boolean>(Boolean(localStorage.getItem("signedIn")))
    const history = useHistory();
    useEffect(function() {
        setSignedIn(localStorage.getItem("signedIn") !== null)
    }, [])
    function handleLogout(): any {
        localStorage.removeItem("signedIn")
        setSignedIn(false)
        history.push("/login")
    }
  return (
    <div className="bg-gray-700 flex justify-between px-6 py-4">
      <div className="font-bold text-white text-lg">
        <Link to="/">
        Shop
        </Link>
      </div>
      <ul className="flex gap-4 text-white cursor-pointer">
        {localStorage.getItem("signedIn") && signedIn ? (
          <div className="flex gap-4 text-lg">
           <li onClick={() => {}} className="text-xl">
              <Link to="/checkout">🛒 {value.inCart}</Link>
            </li>
            <li onClick={handleLogout}>
              <Link to="#">Log out</Link>
            </li>
          </div>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
