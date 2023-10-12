const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fs = require("fs");
const stripe = require("stripe")(
  "sk_test_51NoS4DFDZ1Q35EswtM1dk3lqthdqPfKmU11e8luUDoQh3MLYdV6mOdP8AGQz1CaFDcWOXU6IHj4in3QVAOGXMium00i3OYNCnb"
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/products", async (req, res) => {
  const products = await stripe.products.list();
  res.send(products);
});
app.get("/prices", async (req, res) => {
  const prices = await stripe.prices.list();
  res.send(prices);
});
app.post("/checkout/payment", async (req, res) => {
  const lineItems = req.body.map((product) => ({
    price: product.default_price,
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success", // Replace with your success URL
      cancel_url: "http://localhost:5173/checkout", // Replace with your cancel URL
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});
// Endpoints
app.post("/register", async function (req, res) {
  //1. Check if inputs are not empty
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password)
    return res.send("All fields are required");

  // Skapa en customer i Stripe
  const customer = await stripe.customers.create({
    email: email,
  });
  //3. Create the user with a hashed password.
  bcrypt.hash(password, saltRounds, function (err, hash) {
    fs.readFile("db.json", "utf-8", function (err, data) {
      const usersObject = JSON.parse(data);
      usersObject["users"].push({
        fullname,
        email,
        password: hash,
        customerID: customer.id,
      });
      fs.writeFileSync("db.json", JSON.stringify(usersObject), "utf-8");
      res.send(usersObject);
    });
  });
});

app.post("/login", async function (req, res) {
  // Find the user in the database
  const { email, password } = req.body;
  if (!email || !password) return res.send("All fields are required");

  fs.readFile("db.json", "utf-8", function (err, data) {
    const usersObject = JSON.parse(data);
    const user = usersObject["users"].filter((u) => u.email === email)[0];

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
});

app.listen(4000, () => {
  console.log("Server startad på port 4000");
});
