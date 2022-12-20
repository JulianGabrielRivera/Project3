const router = require("express").Router();

const Order = require("../models/Order.model");
const Address = require("../models/Address.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { DateTime } = require("luxon");
const User = require("../models/User.model");

// router.get("/saved-checkout", isAuthenticated, (req, res, next) => {
//   User.findById(req.payload._id)
//     .populate("cards")
//     .then((cards) => {
//       console.log(cards);
//       res.json({ cards: cards });
//     });
// });
router.post("/new-order", isAuthenticated, (req, res, next) => {
  // .find gets all the documents if we dont specify what we want.
  const {
    firstName,
    lastName,
    addressLine1,
    city,
    state,
    zipCode,
    phoneNumber,
  } = req.body.addressObject;
  const {
    nameOnCard,
    creditCard,
    expirationMonth,
    expirationYear,
    securityCode,
  } = req.body.paymentObject;
  //   console.log(req.body.cartItems);
  //   console.log(req.body.totalPrice);
  let currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  console.log(currentDate.toLocaleString("en-US", options));

  Address.create({
    firstName,
    lastName,
    addressLine1,
    city,
    state,
    zipCode,
    phoneNumber,
    userId: req.payload_id,
  }).then((addressCreated) => {
    //   console.log(addressCreated, "yo");
    console.log(DateTime);
    return Order.create({
      userId: req.payload._id,
      shippingAddress: addressCreated._id,

      dateOfOrder: currentDate.toLocaleString("en-US", options),
      places: req.body.cartItems.map((e) => {
        console.log(e.place);
        console.log(e.quantity);
        return {
          productId: e._id,
          purchaseQuantity: e.quantity,
        };
      }),
      total: req.body.totalPrice,
    })
      .then((orderCreated) => {
        console.log(orderCreated, "order");
        res.json({ order: orderCreated });
      })

      .catch((err) => console.log(err));
  });
});

router.post("/cartitems", (req, res, next) => {
  if ((req.body.cartItems.length = 1)) {
    console.log(req.body.cartItems[0].price);
    console.log(req.body.cartItems.cartItems);
  } else {
    console.log(req.body.cartItems[0]);
    req.body.cartItems[0].forEach((cartItem) => {
      console.log(cartItem.price);
    });
  }
  console.log(req.body.cartItems[0]);

  // console.log("hey");
});
router.get("/past-orders", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  Order.find({ userId }).then((foundOrders) => {
    // console.log(foundOrders);
    res.json({ foundOrders });
  });
});

module.exports = router;
