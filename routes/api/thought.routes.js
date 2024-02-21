const router = require("express").Router();
const Thought = require("../../models/Thought");
const User = require("../../models/User");

// Find all thoughts
router.get("/", async(req, res) => {
  const result = await Thought.find({})
  res.json({ result })
});

//Find thoughts by id value 
router.get("/:id", async(req, res) => {
  const result = await Thought.findById(req.params.id);
  res.json({ result })
});

// Create a new thought and push the created thought's id to the associated user's thoughts array field
router.post("/", async(req, res) => {
  const result = await Thought.create(req.body);
  

const poster = await User.findById(req.body.userId);
poster.thoughts.push(result._id);
res.json({ result })
})



// TODO: Find a thought by ID and update 
router.put("/:id", async(req, res) => {
  const result = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json({ result });
})




// Delete a thought
router.delete("/:id", async(req, res) => {
  const result = await Thought.findByIdAndDelete(req.params.id)
  const poster = await Thought.findOne({ username: result.username});
  
  poster.thoughts = poster.thoughts.filter(thoughtId =>
  thoughtId.toString() !== req.params.id);
  await poster.save();

  res.json({ result });
})

//create a reaction stored in a single thought's reactions array field
router.post("/:thoughtId/reactions", async (req, res) => {
  const result = await Thought.findById(req.params.thoughtId);
  result.reactions.push(req.body)
  await result.save();
  res.json({result, message: "reaction stored"})
});


//delete to pull and remove a reaction by the reactions reactionId value
router.delete("/:thoughtId/reactions", async (req, res) => {
  const result = await Thought.findById(req.params.thoughtId);
thought.reactions = thought.reactions.filter(reactionId => reactionId.toString() !== req.params.reactionId);
await result.save();
res.json({result, message: "reaction deleted"})
});

module.exports = router;