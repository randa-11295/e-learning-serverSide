var jwt = require('jsonwebtoken');


const generetToken = (id)=>{
  return jwt.sign({id }, "eeee")
}

module.exports = generetToken