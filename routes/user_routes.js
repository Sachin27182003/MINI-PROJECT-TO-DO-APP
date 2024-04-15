const express = require('express')
const {add_Lists, get_Lists, complete_incomplete_task, delete_task} = require('../controller/user_controller');
const router = express.Router();



router.post('/tasks' , add_Lists)
router.get('/tasks/:id' , get_Lists)
router.patch('/tasks/status/:id' , complete_incomplete_task)
router.delete('/tasks/:id' , delete_task)


module.exports = router;