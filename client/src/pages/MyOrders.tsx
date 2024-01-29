import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

  function findOrders() {
    fetch(
      "http://localhost:3000/myorder/" + localStorage.getItem("currentUser")
    )
      .then((res) => res.json())
      .then((data) => setMyOrders(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    findOrders();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold p-2 text-center">
        Total orders you made: {myOrders.length}
      </h3>
      {myOrders.map((order) => (
        <>
          <h3 className="text-center mt-2 text-lg">Products</h3>
          <div className="flex shadow-md justify-evenly items-center gap-4 mt-4 mb-4 p-2 bg-white">
            {order?.products.map((product) => (
              <div className="">
                <img src={product.images[0]} width="100" />
                <div>
                  <div>{product.name}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default MyOrders;
