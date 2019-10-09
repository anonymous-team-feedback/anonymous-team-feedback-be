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
  console.error('user id', req.user._id)
  console.log('id: ', req.params.id)
  if(req.user._id === req.params.id){
    user.findUser(req.params.id)
    .then(user => res.status(200).json(user[0]))
    .catch(err => res.status(400).json({error: 'there was an issue with router.get(userid) in user.js'}))
  }
})
module.exports = router;