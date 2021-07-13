const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {type: String,  unique: true,
  lowercase: true},
  password: {type: String, required: 'Email address is required'},
});

userSchema.pre("save", function(next){
  const user = this;

  const salt = bcrypt.genSaltSync(10);
  const hashedPsw = bcrypt.hashSync(user.password, salt);
  user.password = hashedPsw;

  next();
});

userSchema.methods.isSamePassword = function(requestedPassword){
  return bcrypt.compareSync(requestedPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);