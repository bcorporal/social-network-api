const router = require('express').Router();
// const { User } = require('../../models');


const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// /api/getUsers
router
.route('/')
.get(getUsers)
.post(createUser);

// /api/students/:userId
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// /api/students/:userId/friends/:assignments
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
