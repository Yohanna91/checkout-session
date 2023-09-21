import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ReactNode } from "react"

interface Props {
  children?:  ReactNode
}

const LoginCheck = ({ children }: Props) => {
  const signedIn: Boolean = Boolean(localStorage.getItem("signedIn"))
    const history = useHistory();

  const isSignedIn = () => {
    if (!signedIn) {
    return history.push("/login")
    }
  }

  useEffect(() => {
    isSignedIn();
  }, [])
  
  return (
    <>
      {children}
    </>
  )
};

export default LoginCheck;