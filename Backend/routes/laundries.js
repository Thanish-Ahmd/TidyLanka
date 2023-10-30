const router = require("express").Router();
let Laundry = require("../models/Laundry");

const jwt = require("jsonwebtoken");
const secretKey = "hey" ;

router.post("/add", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const operatingHours = req.body.operatingHours;
  const contact = req.body.contact;
  const paymentMethods = req.body.paymentMethods;
  const turnAroundTime = req.body.turnAroundTime;
  const washDryFold = req.body.washDryFold;
  const washIron = req.body.washIron;
  const dryClean = req.body.dryClean;
  const password = req.body.password ;
  const longitude = req.body.longitude ;
  const latitude = req.body.latitude ;

  try {
    const newLaundry = new Laundry({
      name,
      password ,
      email,
      address,
      operatingHours,
      contact,
      paymentMethods,
      turnAroundTime,
      washDryFold,
      washIron,
      dryClean,
      longitude,
      latitude
    });

    await newLaundry.save();

    return res.status(200).json({ message: "Laundry added successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/get/:id").get((req, res) => {
  let id = req.params.id;

  Laundry.findById(id)
    .then((laundry) => {
      res.json(laundry);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let id = req.params.id;

  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const operatingHours = req.body.operatingHours;
  const contact = req.body.contact;
  const paymentMethods = req.body.paymentMethods;
  
  const turnAroundTime = req.body.turnAroundTime;
  const washDryFold = req.body.washDryFold;
  const washIron = req.body.washIron;
  const dryClean = req.body.dryClean;
  const password = req.body.password ;
  const longitude = req.body.longitude ;
  const latitude = req.body.latitude ;

  const updatedLaundry = {
    name,
    password ,
    email,
    address,
    operatingHours,
    contact,
    paymentMethods,
    turnAroundTime,
    washDryFold,
    washIron,
    dryClean,
    longitude,
    latitude
  };

  const update = await Laundry.findByIdAndUpdate(id, updatedLaundry)
    .then(() => {
      
      res.status(200).send({ status: "Laundry profile updated" });
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
  Laundry.find()
    .then((laundries) => {
      res.status(200).json(laundries);
    })
    .catch((err) => {
      console.log(err);
    });
});



router.route("/login").post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email + "  " + password) ;

  const laundry = await Laundry.findOne({ email: email });

  try {
    if (laundry) {
      //check if password matches
      const result = password === laundry.password;

      if (result) {
        const token = jwt.sign({ email: laundry.email }, secretKey, {
          expiresIn: "1h",
        });
        res.status(200).send({ rst: "success", data: laundry, tok: token });
      } else {
        res.status(200).send({ rst: "incorrect password" });
      }
    } else {
      res.status(200).send({ rst: "invalid laundry user" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
