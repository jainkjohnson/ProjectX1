function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    // Authentication successfull
    return next();
  }

  // HTTP 401 Unauthorized
  res.status(401).send({ error: 'Authentication Failure' });
}

module.exports = { requiresLogin };
