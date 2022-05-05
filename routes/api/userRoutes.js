const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/studentController');

// /api/getUsers
router.route('/').get(getUsers).post(createUser);

// /api/students/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// /api/students/:userId/friends/:assignments
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
