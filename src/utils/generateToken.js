const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  console.log(process.env.JWT_SECRET)
  return jwt.sign( {id:id} , process.env.JWT_SECRET, {
    // expiresIn: "30d",
  
  });
};

module.exports = generateToken;
