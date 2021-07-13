const config = require("../config/dev");
const User = require("../models/user");
const jwt = require('jwt-simple');

exports.signup = function(req, res, next){
    const username = req.body.username;
    const password = req.body.password;
    const passwordConf = req.body.passwordConfirmation;
  
    if(password !== passwordConf) {
      return res.status(422).send({errors: [{title: 'Invalid Password', detail: "Password is not same as confirmation"}] });
    }
  
    if(!username || !password){
      return res.status(422).send({errors: [{title: 'Data Missing', detail: "Provide email and password"}] });
    }
  
   // See if user with given username exists
   User.findOne({username: username}, function(err, existingUser){
    if(err){
    }
  
    // If a user with email does exist, return an error
    if(existingUser){
        return res.json("user already exists");
    }
    // If a user with email; does not exist , create and save user record
    const user = new User({
      username: username,
      password: password
    });
  
    user.save(function(err){
      if(err) return "error";
  
      // Respond to request indicating the user was created
      return res.json({registered: true});
     });
   });
}

exports.signin = function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) return res.status(422).send({errors: [{title: 'Missing Data', detail: "Provide username and password"}] });
  
    User.findOne({username: username}, function(err, user) {
      if (err) return res.status(422).send({errors: normalizeErrors(err.errors) });
      if (!user) return res.status(422).send({errors: [{title: 'Invalid User', detail: "User doesnt exist"}] });
  
      if (user.isSamePassword(password)) {
        return res.json({token: jwt.encode({userId: user.id, username: user.username}, config.SECRET)})
      } else {
        return res.status(422).send({errors: [{title: 'Wrong Data', detail: "Wrong username or password"}] });
      }
    })
}

  
exports.authMiddleware = function(req, res, next) {
    const token = req.headers.authorization || '';
  
    if (token) {
      const user = parseToken(token);
  
      User.findById(user.userId, function(err, user){
        if (err) return res.status(422).send({errors: normalizeErrors(err.errors) });
  
        if (user) {
          res.locals.user = user;
          next();
        } else {
          return res.status(422).send({errors: [{title: 'Not Authorized', detail: "You are not authorized"}] });
        }
      });
    } else {
      return res.status(422).send({errors: [{title: 'Not Authorized', detail: "You are not authorized"}] });
    }
}
  