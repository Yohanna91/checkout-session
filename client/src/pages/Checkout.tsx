import React, { useContext, useEffect, useState } from "react"
import AppContext from "../context/appContext"
import { loadStripe } from "@stripe/stripe-js"
import LoginCheck from "../components/LoginCheck"

const Checkout = () => {
const value =  useContext<any>(AppContext)
const [prices, setPrices] = useState([])
useEffect(() => {
    async function fetchPrices() {
    const response = await fetch("http://localhost:4000/prices")
    const prices = await response.json();
    setPrices(prices.data)
    }
    fetchPrices()


  }, [])


  function getPriceForProduct(product) {
    const filteredData = prices.filter(price => price.product == product.id)[0]
    const unitAmount = filteredData?.unit_amount; // Stripe unit_amount in öre
    const realPriceInSEK = convertStripeUnitAmountToSEK(unitAmount);
    if (filteredData) {
       return <h1>{realPriceInSEK} SEK</h1>
    }
  }

  function convertStripeUnitAmountToSEK(unitAmount) {
    const SEKFactor = 100; // 1 SEK = 100 öre
    const priceInSEK = unitAmount / SEKFactor;
    return priceInSEK.toFixed(0); // Format to 2 decimal places
  }

  function handleRemoveProduct(product: any): any {
    const updatedProducts = value.products.filter(current => current.id != product.id)
    value.setProducts(updatedProducts)
    removeFromCart(product)
  }

  function removeFromCart(product: any) {
    // Lägg till produkt i kundkorgen
    value.setinCart(value.inCart - 1)
   
    const inLocalstorage = JSON.parse(localStorage.getItem("items"))
    inLocalstorage.map((item: any, index: any) => {
        if (item.id == product.id) {
            inLocalstorage.splice(index, index + 1)
            localStorage.setItem("items", JSON.stringify(inLocalstorage))
        }
    })
  }

  async function handleOnCheckout(): Promise<any> {
    const stripePromise = loadStripe('pk_test_51NoS4DFDZ1Q35EswDCj7eksWLm9MvEva1DtSCKNWrXHGVO9hpyartkCXFgfi77YhucXCsG7T3yCKapxc8TZQqSJQ00pE6EfZjv');
    const stripe = await stripePromise;
    await fetch("http://localhost:4000/checkout/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value.products),
      })
        .then((res) => res.json())
        .then(async (data) => {
          stripe.redirectToCheckout({ sessionId: data.sessionId})
          localStorage.removeItem("items")
        });
  }

  return (
    <LoginCheck>
    <div className="sm:w-2/3 mx-auto bg-white mt-10 p-4">
        <h1 className="text-2xl text-center">Checkout - Mina produkter</h1>

        {value.products.map((product, index) => (
            <div key={index} className="flex gap-4 justify-between align-center mt-4 border border-b-slate-200 p-2">
            <div className="w-28"><img src={product.images[0]} /></div>
            <div>{product.name}</div>
            <div>{getPriceForProduct(product)}</div>
            <div onClick={() => handleRemoveProduct(product)}>❌</div>
            </div>
        ))}

        <button onClick={handleOnCheckout} className="bg-purple-600 text-white p-2 mt-4 block mx-auto w-24">Beställ</button>
    </div>
    </LoginCheck>
  )
}

export default Checkout