var express = require('express');
var router = express.Router();
var controllerFood = require('../controllers/food');

router.post('/food', controllerFood.post_food);
router.delete('/food/:id', controllerFood.delete_food);
router.put('/food/:id', controllerFood.put_food);

router.get('/food', controllerFood.get_food);
router.get('/food/:id', controllerFood.foodById);

module.exports = router;