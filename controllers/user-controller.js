const { User } = require('../models');

const userController = {

  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a user
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({ message: 'User deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id }, body, { new: true })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // addFriend
  addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No friend with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // deleteFriend
  removeFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id },
      { $pull: {friends: params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No friend with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
