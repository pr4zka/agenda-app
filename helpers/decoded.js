const jwt_decoded = require('jwt-decode')

const decodedToken = (token) => {
  return jwt_decoded(token)
}


module.exports = decodedToken