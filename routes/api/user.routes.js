const router = require("express").Router();
const Customer = require("../../models/Thought");
const Product = require("../../models/User");

// Find all users
router.get("/", async(req, res) => {
  const result = await User.find({})
  res.json({ result })
});

// Find user by id value 
router.get("/:id", async(req, res) => {
  const result = await Customer.findById(req.params.id)
  .populate('thoughts')
  .populate('friends');
  
  res.json({ result })
});

// Create a new customer
router.post("/", async(req, res) => {
  const result = await Customer.create(req.body);
  res.json({ result })
})



// Find a customer by id and update it 
router.put("/:id", async(req, res) => {
  const result = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json({ result });
})

// Delete a customer
router.delete("/:id", async(req, res) => {
  const result = await Customer.findByIdAndDelete(req.params.id)
  res.json({ result });
})



module.exports = router;