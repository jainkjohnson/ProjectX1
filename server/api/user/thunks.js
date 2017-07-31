const User = require('../../modals/user');

function registerUser(reqBody, onSuccess, onFailure) {
  const { email, username, password } = reqBody.body;

  if (email && username && password) {
    User.create({ email, username, password },
      (err, user) => {
        // user: Used to get response from mongoose create function
        // Get user_id to get the userId
        if (err) {
          // Handle error
          if (err.code === 11000) {
            const startStr = 'index: ';
            const endStr = '_1 dup key';
            const dupField = err.errmsg.substring(
              err.errmsg.indexOf(startStr) + startStr.length,
              err.errmsg.lastIndexOf(endStr)
            );

            // [TODO]: Change constants to seperate file
            return onFailure({
              status: 400,
              error: `${dupField} already exits`
            });
          }

          return onFailure(err);
        }
        // [TODO]: Change constants to seperate file

        return onSuccess(user._id);
      }
    );
  } else {
    onFailure({
      status: 400,
      error: 'invalid request body'
    });
  }
}

function authenticateUser(reqBody, onSuccess, onFailure) {
  const { email, username, password } = reqBody.body;

  if ((email || username) && password) {
    User.findOne({
      $or: [{ email }, { username }]
    }, (err, user) => {
      // Error
      if (err) return onFailure(err);

      // No such user found
      if (!user) {
        return onFailure(
          {
            status: 401,
            error: email ? 'email not fount' : 'username not found'
          }
        );
      }

      // If user exists send response data
      return onSuccess(user);
    });
  }
}

module.exports = {
  registerUser,
  authenticateUser
};

