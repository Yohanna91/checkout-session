import React, { createContext, useState } from "react"

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [inCart, setinCart] = useState(JSON.parse(localStorage.getItem("items"))?.length || 0)
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("items")))
   return <AppContext.Provider value={{ inCart, setinCart, products, setProducts }}>
    {children}
   </AppContext.Provider>   
} 

export default AppContext