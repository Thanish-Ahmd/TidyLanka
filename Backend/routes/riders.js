const router = require("express").Router();
let Rider = require("../models/Rider");

const jwt = require("jsonwebtoken");
const secretKey = "hey" ;

router.post("/add", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const contact = req.body.contact;
  const nicPassport = req.body.nicPassport;
  const licenseNo = req.body.licenseNo;
  const password = req.body.password;
  const licenseIssueDate = req.body.licenseIssueDate;
  const vehicleNo = req.body.vehicleNo;
  const licenseExpiryDate = req.body.licenseExpiryDate;
  const vehicleModel = req.body.vehicleModel;



  try {
    const newRider = new Rider({
      name,
      email,
      address,
      contact,
      nicPassport,
      licenseNo,
      password,
      licenseIssueDate,
      licenseExpiryDate,
      licenseNo,
      vehicleModel,
      vehicleNo
    });

    await newRider.save();

    return res
      .status(200)
      .json({ message: "Rider added successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/get/:id").get((req, res) => {
  let id = req.params.id;

  Rider.findById(id)
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
    const nicPassport = req.body.nicPassport;
    const licenseNo = req.body.licenseNo;
    const password = req.body.password;
    const licenseIssueDate = req.body.licenseIssueDate;
    const vehicleNo = req.body.vehicleNo;
    const licenseExpiryDate = req.body.licenseExpiryDate;
    const vehicleModel = req.body.vehicleModel;
  
  

    const updatedRider = {
        name,
      email,
      address,
      contact,
      nicPassport,
      licenseNo,
      password,
      licenseIssueDate,
      licenseExpiryDate,
      licenseNo,
      vehicleModel,
      vehicleNo
    }
   


      const update = await Rider.findByIdAndUpdate( id , updatedRider ).then( ()=> {
        res.status(200).send({status: "Rider profile updated" })
    }).catch((err) => {
        console.log(err) ;
        res.status(500).send({ status: "Error with updating information" , error : err.message }) ;
    })
  });

router.route("/").get((req, res) => {
  Rider.find()
    .then((riders) => {
      res.status(200).json(riders);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.route("/login").post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const rider = await Rider.findOne({ email: email });

  try {
    if (rider) {
      //check if password matches
      const result = password === rider.password;

      if (result) {
        const token = jwt.sign({ email: rider.email }, secretKey, {
          expiresIn: "1h",
        });
        
        res.status(200).send({ rst: "success", data: rider, tok: token });
      } else {
        res.status(200).send({ rst: "incorrect password" });
      }
    } else {
      res.status(200).send({ rst: "invalid rider" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});


  

module.exports = router;
