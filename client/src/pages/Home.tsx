import { useEffect, useState, useContext} from "react"
import AppContext from "../context/appContext"
import LoginCheck from "../components/LoginCheck"
import React from 'react'

const Home = () => {
  const value = useContext(AppContext)
  const [products, setProducts] = useState<any>()

  function addToCart(product: any): any {
    // Lägg till produkt i kundkorgen
    value.setinCart(value.inCart + 1)
    // LÄgg produkten i localstorage minne
    if (localStorage.getItem("items") == null) {
      const items = []
      items.push(product);
      localStorage.setItem("items", JSON.stringify(items))
    } else {
      const items = JSON.parse(localStorage.getItem("items"));
      items.push(product)
      localStorage.setItem("items", JSON.stringify(items))
    }
    value.setProducts(JSON.parse(localStorage.getItem("items")))

  }

  useEffect(() => {
    async function fetchProducts() {
    const response = await fetch("http://localhost:4000/products")
    const products = await response.json();
    setProducts(products)
    }
    fetchProducts()

  })
  return(
    <LoginCheck>
  <div className="flex gap-4 justify-center mt-6">
    {products?.data.map((product: any, index: Number) => (
      <div className="text-center">
        <img  
          className="w-72 h-60"
          src={product.images[0]} 
        />
        <h3 
          className="text-xl py-2"
          key={index}
        >
            {product.name}
        </h3>
       <button 
        className="bg-purple-600 text-white p-2 block mx-auto rounded-md font-semibold mt-2 hover:-translate-y-1 hover:transition-all"
        onClick={() => addToCart(product)}
        >
          Lägg till i kundvagn
        </button>
      </div>
    ))}
  </div>
  </LoginCheck>
  )
}

export default Home;