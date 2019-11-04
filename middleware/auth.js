const User = require('../models/user');
const secretKey = process.env.SECRET_KEY || 'changeme';

function authenticate(req, res, next) {
  // Ensure the header is present.
  const authorization = req.get('Authorization');
  if (!authorization) {
    return res.status(401).send('Authorization header is missing');
  }
  // Check that the header has the correct format.
  const match = authorization.match(/^Bearer (.+)$/);
  if (!match) {
    return res.status(401).send('Authorization header is not a bearer token');
  }
  // Extract and verify the JWT.
  const token = match[1];
  jwt.verify(token, secretKey, function(err, payload) {
    if (err) {
      return res.status(401).send('Your token is invalid or has expired');
    } else {
      req.currentUserId = payload.sub;
      next(); // Pass the ID of the authenticated user to the next middleware.
    }
  });
}