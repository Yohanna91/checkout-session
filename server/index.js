const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("./models/User");
const Order = require("./models/Order");
const stripe = require("stripe")(
  "sk_test_51NoS4DFDZ1Q35EswtM1dk3lqthdqPfKmU11e8luUDoQh3MLYdV6mOdP8AGQz1CaFDcWOXU6IHj4in3QVAOGXMium00i3OYNCnb"
);
const bodyParser = require("body-parser");
const PORT = 3000;

// database
const database = require("./database/config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

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

    res.json({ sessionId: session.id, orders: req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.post("/register", function (req, res) {
  const { email, password } = req.body;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      User.create({
        email: email,
        password: hash,
      })
        .then((ok) => console.log("User is created!"))
        .catch((error) => console.log(error));
    });
  });
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((match) => {
      bcrypt.compare(password, match.password, function (err, result) {
        res.send(result);
      });
    })
    .catch((err) => console.log(err));
});

app.post("/order_success/:user", function (req, res) {
  const body = req.body;
  const currentUser = req.params.user;
  Order.create({
    products: req.body,
    email: currentUser,
  })
    .then((crated) => res.send(true))
    .catch((err) => res.send(err));
});

app.get("/myorder/:user", function (req, res) {
  const user = req.params.user;
  Order.find({ email: user })
    .then((products) => res.send(products))
    .catch((err) => res.send(err));
});

app.listen(PORT, () => {
  console.log("Server startad på port " + PORT);
});
