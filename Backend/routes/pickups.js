const router = require("express").Router();
const Pickup = require("../models/Pickup");
let Rider = require("../models/Pickup");
const Order = require("../models/Order");

router.post("/add", async (req, res) => {
  const rider = req.body.rider;
  const order = req.body.order;
  const stop1Longitude = req.body.stop1Longitude;
  const stop1Latitude = req.body.stop1Latitude;
  const stop1 = req.body.stop1;
  const stop2 = req.body.stop2;
  const stop2Longitude = req.body.stop2Longitude;
  const stop2Latitude = req.body.stop2Latitude;
  const date = req.body.date;
  const pickupType = req.body.pickupType;
  const fee = req.body.fee;

  let status = "";

  if (pickupType == "Customer To Laundry") {
    status = "On the Way to Laundry";
  } else {
    status = "On The way to Customer";
  }

  try {
    const newPickup = new Pickup({
      rider,
      order,
      stop1,
      stop1Latitude,
      stop1Longitude,
      stop2,
      stop2Latitude,
      stop2Longitude,
      date,
      pickupType,
      fee,
    });

    await newPickup.save();

    const updatedOrder = {
      status,
    };

    await Order.findByIdAndUpdate(order, updatedOrder)
      .then((response) => {
        return res.status(200).json({ message: "Pickup added successfully." });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/get/:id").get((req, res) => {
  let id = req.params.id;

  Pickup.findById(id)
    .then((pickup) => {
      res.json(pickup);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/riderPickup/:id").get((req, res) => {
  let id = req.params.id;

  Pickup.findOne({ rider: id, status: { $ne: "Completed" } })
    .then((pickup) => {
      res.json(pickup);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/completeRide/:id/:oid/:status").put(async (req, res) => {
  let id = req.params.id;
  let oid = req.params.oid;
  let stat = req.params.status;

  console.log(oid);

  if (stat == "On the Way to Laundry") {
    const status = "In the laundry";
    const updatedOrder = {
      status,
    };
    Order.findByIdAndUpdate(oid, updatedOrder)
      .then(async () => {
        console.log("Done 111");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const status = "Done";
    const updatedOrder = {
      status,
    };
    Order.findByIdAndUpdate(oid, updatedOrder)
      .then(async () => {
        console.log("Done");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const status = "Completed";

  const updatedRide = {
    status,
  };
  const update = Pickup.findByIdAndUpdate(id, updatedRide)
    .then(async () => {
      res.status(200).send({ status: "Ride updated" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let id = req.params.id;
  const rider = req.body.rider;
  const order = req.body.order;
  const stop1Longitude = req.body.stop1Longitude;
  const stop1Latitude = req.body.stop1Latitude;
  const stop1 = req.body.stop1;
  const stop2 = req.body.stop2;
  const stop2Longitude = req.body.stop2Longitude;
  const stop2Latitude = req.body.stop2Latitude;
  const date = req.body.date;
  const pickupType = req.body.pickupType;

  const updatedPickup = {
    rider,
    order,
    stop1,
    stop1Latitude,
    stop1Longitude,
    stop2,
    stop2Latitude,
    stop2Longitude,
    date,
    pickupType,
  };

  const update = await Pickup.findByIdAndUpdate(id, updatedPickup)
    .then(() => {
      res.status(200).send({ status: "Pickup updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "Error with updating information",
        error: err.message,
      });
    });
});

router.route("/").get((req, res) => {
  Pickup.find()
    .then((pickups) => {
      res.status(200).json(pickups);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/riderOrders/:id").get((req, res) => {
  let id = req.params.id;

  Pickup.find({ rider: id, status: "Completed" })
    .then((pickups) => {
      res.status(200).json(pickups);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/delete").delete((req, res) => {
  Pickup.deleteMany({})
    .then(() => {
      res.status(200).json("All rides deleted");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(202)
        .send({
          status: "Error with deleting all  Orders",
          error: err.message,
        });
    });
});
module.exports = router;
