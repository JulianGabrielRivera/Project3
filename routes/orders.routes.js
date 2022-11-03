const router = require("express").Router();

const Order = require("../models/Order.model");
const Address = require("../models/Address.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { DateTime } = require("luxon");

router.post("/new-order", isAuthenticated, (req, res, next) => {
  // .find gets all the documents if we dont specify what we want.

  const { firstName, lastName, addressLine1, city, state, zipCode } =
    req.body.addressObject;
  //   console.log(req.body.cartItems);
  //   console.log(req.body.totalPrice);
  let currentDate = new Date();
  console.log(
    currentDate.toLocaleString() //=> '4/20/2017'
  );
  console.log(currentDate.toLocaleString(DateTime.DATETIME_FULL));
  console.log(
    currentDate.toLocaleString(DateTime.DATE_SHORT), //=> 'April 20, 2017 at 11:32 AM EDT'
    "ehhehhe"
  );
  console.log(
    DateTime.fromISO("currentDate").toFormat("yyyy LLL dd") //=> '2014 Aug 06'
  );
  console.log(
    currentDate.toLocaleString({
      month: "long",
      //   day: "numeric",
      //   weekday: "long",
    })
  );

  dt.toLocaleString(DateTime.DATE_SHORT); //=>  '4/20/2017'
  var newFormat = { ...DateTime.DATE_SHORT, weekday: "long" };
  dt.toLocaleString(newFormat);
  Address.create({
    firstName,
    lastName,
    addressLine1,
    city,
    state,
    zipCode,
    userId: req.payload_id,
  })
    .then((addressCreated) => {
      //   console.log(addressCreated, "yo");
      console.log(DateTime);
      return Order.create({
        userId: req.payload._id,
        shippingAddress: addressCreated._id,

        dateOfOrder: new Date(),
        places: req.body.cartItems.map((e) => {
          console.log(e.place);
          console.log(e.quantity);
          return {
            productId: e._id,
            purchaseQuantity: e.quantity,
          };
        }),
        total: req.body.totalPrice,
      });
    })
    .then((newOrder) => {
      console.log(newOrder);

      res.json({ order: newOrder });
    })
    .catch((err) => console.log(err));
});

router.get("/past-orders", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  Order.find({ userId }).then((foundOrders) => {
    console.log(foundOrders);
    res.json({ foundOrders });
  });
});

module.exports = router;
