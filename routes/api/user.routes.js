const router = require("express").Router();
const Customer = require("../../models/Customer");
const Product = require("../../models/Product");

// Find all customers 
router.get("/", async(req, res) => {
  const result = await Customer.find({}).populate("wishList")
  res.json({ result })
});

// Find customer by id value 
router.get("/:id", async(req, res) => {
  const result = await Customer.findById(req.params.id);
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