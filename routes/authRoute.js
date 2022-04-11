const express = require("express");
const { User } = require("../models/usersModel");
const router = express.Router();

// register
router.post("/register", async (req, res) => {
  const { name, email, address, password } = req.body;
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    return res.status(400).json({ msg: `Email Is Exists..` });
  } else {
    const userData = new User({ name, email, password, address });
    await userData.save();
    res.status(201).json( userData );
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: `email   wrong..` });
  } else {
    if (password != user.password) {
      return res.status(401).json({ msg: `password wrong..` });
    } else {
      res.status(200).json( user);
    }
  }
});
//{ adress : {}   }

router.patch("/update/:id", async (req, res) => {
   try {
    const update = await User.findByIdAndUpdate(req.params.id , req.body,{
      new:true
    })
 
    res.json({
      status :"succsess",
      update
    })
   } catch (error) {
    res.json({
      status :"Falid",
      error
    })
   }

});



module.exports = router;
