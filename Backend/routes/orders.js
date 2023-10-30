const router = require("express").Router();
let Order = require("../models/Order");

router.post("/add", async (req, res) => {
  const customerName = req.body.customerName;
  const laundryName = req.body.laundryName;
  const customer = req.body.customerID;
  const laundry = req.body.laundryID;
  const customerAddress = req.body.customerAddress;
  const laundryAddress = req.body.laundryAddress;
  const customerlongitude = req.body.customerlongitude;
  const customerlatitude = req.body.customerlatitude;
  const service = req.body.service;
  const weight = req.body.weight;
  const laundrylongitude = req.body.laundrylongitude;
  const laundrylatitude = req.body.laundrylatitude;
  const deliveryFee = req.body.deliveryAmount;
  const laundryFee = req.body.laundryFee;
  const pickupDate = req.body.pickupDate;
  const deliveryDate = req.body.deliveryDate;

  try {
    const newOrder = new Order({
      customer,
      customerName,
      laundryName,
      laundry,
      customerAddress,
      laundryAddress,
      customerlatitude,
      customerlongitude,
      laundrylatitude,
      laundrylongitude,
      service,
      weight,
      deliveryFee,
      laundryFee,
      pickupDate,
      deliveryDate,
    });

    await newOrder.save();

    return res.status(200).json({ message: "Order added successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/get/:id").get((req, res) => {
  let id = req.params.id;

  Order.findById(id)
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/pendingCustomers/:id").get((req, res) => {
  let id = req.params.id;

  Order.find({ customer: id, status: "Pending" })
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/rejectedCustomers/:id").get((req, res) => {
  let id = req.params.id;

  Order.find({ customer: id, status: "Rejected" })
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.route("/acceptedCustomers/:id").get((req, res) => {
  let id = req.params.id;

  Order.find({ customer: id, status: { $in : ["Done" , "Completed" , "In the laundry" , "On the Way to Laundry" , "On the Way to Customer" , "Received" , "Accepted"]} })
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/laundryPending/:id").get((req, res) => {
  let id = req.params.id;

  Order.find({ laundry: id, status: "Pending" })
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/laundryAccepted/:id").get((req, res) => {
  let id = req.params.id;

  Order.find({ laundry: id, status: { $in : ["Accepted" , "In the laundry" , "On the Way to Laundry"]} })
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/laundryCompleted/:id").get((req, res) => {
  let id = req.params.id;

  Order.find({ laundry: id, status: { $in : ["Done" , "Completed" , "On The way to Customer" , "Received"]} })
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/acceptOrder/:id").put(async (req, res) => {
  let id = req.params.id;
  const status = "Accepted";

  const updatedOrder = {
    status,
  };

  const update = await Order.findByIdAndUpdate(id, updatedOrder)
    .then(() => {
      res.status(200).send({ status: "Order Accepted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({
          status: "Error with accepting order",
          error: err.message,
        });
    });
});


router.route("/receiveOrder/:id").put(async (req, res) => {
  let id = req.params.id;
  const status = "Received";

  const updatedOrder = {
    status,
  };

  const update = await Order.findByIdAndUpdate(id, updatedOrder)
    .then(() => {
      res.status(200).send({ status: "Order Received" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({
          status: "Error with accepting order",
          error: err.message,
        });
    });
});


router.route("/deliverOrder/:id").put(async (req, res) => {
  let id = req.params.id;
  const status = "Delivered";

  const updatedOrder = {
    status,
  };

  const update = await Order.findByIdAndUpdate(id, updatedOrder)
    .then(() => {
      res.status(200).send({ status: "Order Delivered" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({
          status: "Error with accepting order",
          error: err.message,
        });
    });
});


router.route("/rejectOrder/:id").put(async (req, res) => {
  let id = req.params.id;
  const status = "Rejected";

  const updatedOrder = {
    status,
  };

  const update = await Order.findByIdAndUpdate(id, updatedOrder)
    .then(() => {
      res.status(200).send({ status: "Order Rejected" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({
          status: "Error with accepting order",
          error: err.message,
        });
    });
});

router.route("/completeOrder/:id").put(async (req, res) => {
  let id = req.params.id;
  const status = "Completed";

  const updatedOrder = {
    status,
  };

  const update = await Order.findByIdAndUpdate(id, updatedOrder)
    .then(() => {
      res.status(200).send({ status: "Order Completed" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({
          status: "Error with accepting order",
          error: err.message,
        });
    });
});

router.route("/riderOrders").get(async (req, res) => {

  const today = new Date().toDateString() ;


 await Order.find({  $or: [
  {
    $and: [
      { deliveryDate: today },
      { status :{ $in : ["Accepted" , "Completed"] } },
    ],
  },
  {
    $and: [
      { pickupDate: today },
      { status :{ $in : ["Accepted" , "Completed"] } },
    ],
  },
] }).sort({ pickupDate: -1 , deliveryDate : -1 })
    .then((orders) => {
      res.json(orders) ;
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({
          status: "Error with accepting order",
          error: err.message,
        });
    });
});


router.route("/update/:id").put(async (req, res) => {
  let id = req.params.id;

  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const contact = req.body.contact;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const password = req.body.password;

  const updatedCustomer = {
    name,
    email,
    address,
    contact,
    longitude,
    latitude,
    password,
  };

  const update = await Order.findByIdAndUpdate(id, updatedCustomer)
    .then(() => {
      res.status(200).send({ status: "Order profile updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({
          status: "Error with updating information",
          error: err.message,
        });
    });
});

router.route("/").get((req, res) => {
  Order.find()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let id = req.params.id;

  await Order.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ status: "Order deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(202)
        .send({ status: "Error with deleting the Order", error: err.message });
    });
});


router.route("/delete").delete(async (req, res) => {
  let id = req.params.id;

  await Order.deleteMany({})
    .then(() => {
      res.status(200).send({ status: "Orders deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(202)
        .send({ status: "Error with deleting all  Orders", error: err.message });
    });
});

module.exports = router;
