const router = require("express").Router();
let Customer = require("../models/Customer");

const jwt = require("jsonwebtoken");
const secretKey = "hey" ;

router.post("/add", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const contact = req.body.contact;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const password = req.body.password;


  try {
    const newCustomer = new Customer({
      name,
      email,
      contact,
      address,
      latitude,
      longitude,
      password
    });

    await newCustomer.save();

    return res
      .status(200)
      .json({ message: "Customer added successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/get/:id").get((req, res) => {
  let id = req.params.id;

  Customer.findById(id)
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.route("/update/:id").put(async(req, res) => {
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
        password
    }
   


      const update = await Customer.findByIdAndUpdate( id , updatedCustomer ).then( ()=> {
        res.status(200).send({status: "Customer profile updated" })
    }).catch((err) => {
        console.log(err) ;
        res.status(500).send({ status: "Error with updating information" , error : err.message }) ;
    })
  });

router.route("/").get((req, res) => {
  Customer.find()
    .then((customers) => {
      res.status(200).json(customers);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.route("/login").post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const customer = await Customer.findOne({ email: email });

  try {
    if (customer) {
      //check if password matches
      const result = password === customer.password;

      if (result) {
        const token = jwt.sign({ email: customer.email }, secretKey, {
          expiresIn: "1h",
        });
        
        res.status(200).send({ rst: "success", data: customer, tok: token });
      } else {
        res.status(200).send({ rst: "incorrect password" });
      }
    } else {
      res.status(200).send({ rst: "invalid user" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});


  

module.exports = router;
