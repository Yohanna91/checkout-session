import { AppProvider } from "./context/appContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./components/Header"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Checkout from "./pages/Checkout"
import Success from "./pages/Success"

function App() {
  return (
    <Router>
      <AppProvider>
      <Header />
    <Switch>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/checkout">
        <Checkout />
      </Route>
      <Route path="/success">
        <Success />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    </AppProvider>
    </Router>

  )
}

export default App