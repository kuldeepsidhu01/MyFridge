var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
// Render Home Page
var renderHomepage = function(req, res, responseBody){
    var message;
    if (!(responseBody instanceof Array)) {
      message = "API lookup error";
      responseBody = [];
    } else {
      if (!responseBody.length) {
        message = "No Food Items found";
      }
    }
    res.render('list', {
      title: 'List Of items in my fridge',
      message: message,
      foods: responseBody
    });
  };
  

module.exports.FoodList = function(req, res){
    var requestOptions, path;
    path = '/api/food';
    requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {}
    };
    request(
      requestOptions,
      function(err, response, body) {
        renderHomepage(req, res, body);
      }
    );
  };

  module.exports.delete_food = function(req, res){
    var requestOptions, path;
    path = '/api/food/' + req.params.id;
    requestOptions = {
      url : apiOptions.server + path,
      method : "DELETE",
      json : {},
      qs : {},
      params : {id: req.params.id}
    };
    request(
      requestOptions,
      function(err, response, body) {
        res.redirect('/');
      }
    );
  }

  module.exports.load_create_food = function(req, res){
    res.render('create-edit', {
      title: 'Add item to my fridge',
      create: true,
      food: {
        expiry: '',
        name: '',
        date: '',
        left_overs: false,
        quantity: 1
      }
    });
  } 

  module.exports.edit_food = function(req, res){
    console.log("GET CALLED");
    var requestOptions, path;
    path = '/api/food/' + req.params.id;
    requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {},
      params : {id: req.params.id}
    };
    request(
      requestOptions,
      function(err, response, body) {
        var data;
        data = body;
        if (response.statusCode === 200 && data) {
          var food_item = data[0];
          food_item.date = formatDate(food_item.date);
          if (food_item.expiry){
            food_item.expiry = formatDate(food_item.expiry);
          }
          res.render('create-edit', {
            title: 'modify item in my fridge',
            create: false,
            food: food_item
          });
        }
      }
    );
  }
  
  module.exports.create_food_item = function(req, res){
    var requestOptions, path;
    path = '/api/food';
    if (req.body.left_overs == 'on')
      req.body.left_overs = true;
    requestOptions = {
      url : apiOptions.server + path,
      method : "POST",
      json : req.body,
    };
    request(
      requestOptions,
      function(err, response, body) {
        res.redirect('/');
      }
    );
  }

  function formatDate(date){
    var d = new Date(date);
    var day =  d.getDate();
    if (day < 10)
      day = '0' + day;
    var month =  parseInt(d.getMonth()+ 1);
    if (month < 10)
      month = '0' + month;
    return d.getFullYear() + '-'+ month + '-' + day;
  }

// PUT method
  module.exports.put_food = function(req, res){
    var requestOptions, path;
    path = '/api/food/' + req.params.id;
    if (req.body.left_overs == 'on')
      req.body.left_overs = true;
    requestOptions = {
      url : apiOptions.server + path,
      method : "PUT",
      json : req.body
    };
    request(
      requestOptions,
      function(err, response, body) {
        res.redirect('/');
      }
    );
  }
