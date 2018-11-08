var express = require('express');
var router = express.Router();
var controllerFood = require('../controllers/food');

router.get('/', controllerFood.FoodList);
router.get('/food/delete/:id', controllerFood.delete_food);
router.get('/create-edit', controllerFood.load_create_food);
router.get('/create-edit/:id', controllerFood.edit_food);
router.post('/create-edit', controllerFood.create_food_item);
router.post('/create-edit/:id', controllerFood.put_food);

module.exports = router;
