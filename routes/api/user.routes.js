const router = require("express").Router();
const Customer = require("../../models/Thought");
const Product = require("../../models/User");

// Find all users
router.get("/", async (req, res) => {
  try {
    const result = await User.find({});
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching all users.' });
  }
});

// Find user by id value and populate thought and friend data
router.get("/:id", async (req, res) => {
  try {
    const result = await Customer.findById(req.params.id)
      .populate('thoughts')
      .populate('friends');

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user.' });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const result = await User.create(req.body);
  res.json({ result })
  } catch (error) {
    res.status(500).json({ error: 'An error occured while creating user.'});
  }
});



// Find a user by id and update 
router.put("/:id", async (req, res) => {
  try {
  const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'An error occured while finding and updating user.'});
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Remove the user's associated thoughts
    await Thought.deleteMany({ username: result.username});

    res.json({ message: 'User and associated thoughts deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting user and associated thoughts.' });
  }
});

router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const result = await User.findById(req.params.userId);
    if (!result) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the friendId exists in the database
    const friend = await User.findById(req.params.friendId);
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found.' });
    }

    // Add the friend to the user's friend list
    user.friends.push(req.params.friendId);
    await user.save();

    res.json({ message: 'Friend added successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding a friend.' });
  }
});

// Remove a friend from a user's friend list
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const result = await User.findById(req.params.userId);
    if (!result) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Remove the friend from the user's friend list
    user.friends = user.friends.filter(friendId => friendId.toString() !== req.params.friendId);
    await user.save();

    res.json({ message: 'Friend removed successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while removing a friend.' });
  }
});

module.exports = router;