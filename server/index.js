const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const stripe = require('stripe')('sk_test_51NoS4DFDZ1Q35EswtM1dk3lqthdqPfKmU11e8luUDoQh3MLYdV6mOdP8AGQz1CaFDcWOXU6IHj4in3QVAOGXMium00i3OYNCnb');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/products", async (req, res) => {
  const products = await stripe.products.list();
  res.send(products)
})
app.get("/prices", async (req, res) => {
  const prices = await stripe.prices.list();
  res.send(prices)
})
app.post("/checkout/payment", async (req, res) => {
  const lineItems = req.body.map(product => ({
    price: product.default_price,
    quantity: 1,
}));

try {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5173/success', // Replace with your success URL
        cancel_url: 'http://localhost:5173/checkout',   // Replace with your cancel URL
    });

    res.json({ sessionId: session.id });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create checkout session' });
}
})
// Endpoints
app.post("/register", async function (req, res) {
  //1. Check if inputs are not empty
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password)
    return res.send("All fields are required");
  //2. Does the user exist already?
  const response = await fetch("http://localhost:5000/users");
  const users = await response.json();
  const condition = users.filter((user) => user.email === email);

  if (condition.length > 0) {
    res.status(400).json({ error: "User already exists." });
  } else {
    // Skapa en customer i Stripe
    const customer = await stripe.customers.create({
      email: email
    });
    //3. Create the user with a hashed password.
    bcrypt.hash(password, saltRounds, function (err, hash) {
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password: hash, customerID: customer.id }),
      })
        .then((success) => res.send("User created successfully"))
        .catch((err) => res.send(err));
    });
  }
});

app.post("/login", async function (req, res) {
  // Find the user in the database
  const { email, password } = req.body;
  if (!email || !password)
    return res.send("All fields are required");

  const response = await fetch("http://localhost:5000/users");
  const users = await response.json();
  const user = users.filter((user) => user.email === email)[0];

 if (user) {
     // Check if the password is correct
  bcrypt.compare(password, user.password, function (err, result) {
    // IS the password correct then result = true
    if (result == true) {
      res.send({ signedIn: true });
    } else {
      res.send({ signedIn: false });
    }
  });
 }
});

app.listen(4000, () => {
  console.log("Server startad på port 4000");
});
