const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const user = require("../controllers/user");
const bcrypt = require("bcryptjs");

router.put("/:id", auth, async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const updatedUser = user.findUserAndUpdate(req.params.id, req.body);

  res.status(201).json(updatedUser);
})

router.get('/:id', auth, async(req, res) => {
  if(req.user._id === req.params.id){
    user.findUser(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({error: 'Internal server error: Check your id'}))
  }
})
module.exports = router;