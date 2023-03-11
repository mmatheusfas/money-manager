const express = require("express");
const router = express.Router();

const UsersController = require('./controllers/api_controllers');

router.get('/user_movements/:user_id', UsersController.getAll);
router.get('/get_user_info/:user_id', UsersController.getCurrentUserInfo);
router.post('/new_user', UsersController.newUser);
router.post('/new_movement', UsersController.newMovement);
router.put('/update_user/:user_id', UsersController.updateUser);
router.put('/update_movement/:movement_id', UsersController.updateMovement);
router.delete('/delete_user/:user_id', UsersController.deleteUser);
router.delete('/delete_movement/:movement_id', UsersController.deleteMovement);

module.exports = router;