import { useEffect, useState, useContext } from "react";
import AppContext from "../context/appContext";
import LoginCheck from "../components/LoginCheck";
import { useHistory } from "react-router-dom";

const Home = () => {
  const value = useContext(AppContext);
  const [products, setProducts] = useState<any>();
  const navigate = useHistory();

  function addToCart(product) {
    // Lägg till produkt i kundkorgen
    value.setinCart(value.inCart + 1);
    // LÄgg produkten i localstorage minne
    if (localStorage.getItem("items") == null) {
      const items = [];
      items.push(product);
      localStorage.setItem("items", JSON.stringify(items));
    } else {
      const items = JSON.parse(localStorage.getItem("items"));
      items.push(product);
      localStorage.setItem("items", JSON.stringify(items));
    }
    value.setProducts(JSON.parse(localStorage.getItem("items")));
  }

  useEffect(() => {
    if (Boolean(localStorage.getItem("signedin"))) {
      navigate.push("/");
    }
    async function fetchProducts() {
      const response = await fetch("http://localhost:3000/products");
      const products = await response.json();
      setProducts(products);
    }
    fetchProducts();
  }, []);
  return (
    <LoginCheck>
      <div className="flex gap-4 justify-center mt-6">
        {products?.data.map((product: any, index: Number) => (
          <div
            className="text-center bg-white py-4 shadow-md rounded"
            key={index}
          >
            <img className="w-72 h-60" src={product.images[0]} />
            <h3 className="text-xl py-2">{product.name}</h3>
            <hr className="py-2 " />
            <button
              className="bg-gray-700 text-white p-2 block mx-auto rounded-md mt-2 hover:bg-gray-900"
              onClick={() => addToCart(product)}
            >
              Add to 🛍
            </button>
          </div>
        ))}
      </div>
    </LoginCheck>
  );
};

export default Home;
