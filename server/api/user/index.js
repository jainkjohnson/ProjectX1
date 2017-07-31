const router = require('express').Router();
const UserThunks = require('./thunks.js');

/**
 * New user registration
 * @name registerUser
 *
 *  method: POST
 *  endpoint: /user/register
 *  request.body:
 *    {
 *      email: test@test.com
 *      username: test
 *      password: *****
 *    }
 *  response:
 *    {
 *      message: ''
 *    }
 */
router.post('/register', (req, res, next) => {
  UserThunks.registerUser(
    // param
    req,

    // On success callback
    (userId) => {
      req.session.userId = userId;
      res.status(200).send({ message: `success ${userId}` });
    },

    // On error callback
    (err) => {
      if (err.error && err.status) {
        res.status(err.status).send({ error: err.error });
      } else {
        // unexpected Error
        next(err);
      }
    }
  );
});

/**
 * User authentication
 * @name authenticateUser
 *
 *  method: POST
 *  endpoint: /user/login
 *  request.body:
 *    {
 *      email: test@test.com || username: test
 *      password: *****
 *    }
 *  response:
 *    {
 *      message: ''
 *    }
 */
router.post('/login', (req, res, next) => {
  UserThunks.authenticateUser(
    // param
    req,

    // On success callback
    (user) => {
      req.session.userId = user._id;
      res.status(200).send({ message: 'Login success' });
    },

    // On error callback
    (err) => {
      if (err.error && err.status) {
        res.status(err.status).send({ error: err.error });
      } else {
        // unexpected Error
        next(err);
      }
    }
  );
});

/**
 * user logout
 * @name userLogout
 *
 *  method: GET
 *  endpoint: /user/logout
 *  response:
 *    {
 *      message: ''
 *    }
 */
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return next(err);
    });

    return res.status(200).send({ message: 'Logout successfully' });
  }
});

// export routes that they be used in other files
module.exports = router;
