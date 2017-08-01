const User = require('../../modals/user');
const utils = require('../../utils');
const config = require('../../config');

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

function updateTimeLineData(params, onSuccess, onFailure) {
  const reqBody = params.reqBody;
  const time = params.reqParams.time || null;
  const remove = params.remove || false;

  User.findOne(
    { _id: params.reqSession.userId },
    (err, user) => {
      if (err) return onFailure(err);
      if (user) {
        const userTimeline = user.timeline || {};

        if (userTimeline[time]) {
          if (remove) {
            delete userTimeline[time];
          } else if (time) {
            // update process
            userTimeline[time] = utils.getObjOwnProps(
              config.USER_TIMELINE_SCHEMA_PROPS,
              reqBody,
              userTimeline[time]
            );
          } else {
            // Both `overwrite` and `remove` flags are `false` implies that
            // user is trying to 'add' an existing book in user's bookshelf.
            // But same bookId already exists in user's Bookshelf.
            // HTTP 409 Conflict
            return onFailure({
              status: 409,
              error: 'Conflict while adding timeline'
            });
          }
        } else if (time) {
          // there is not timeline with this time
          onFailure({
            status: 404,
            error: 'timeline not fount'
          });
        } else {
          // add new timeline
          userTimeline[new Date().getTime()] = utils.getObjOwnProps(
            config.USER_TIMELINE_SCHEMA_PROPS,
            reqBody,
            {}
          );
        }

        User.findOneAndUpdate(
          { _id: params.reqSession.userId },
          { $set: { timeline: userTimeline } },
          (updateErr) => {
            // Unexpected DB error
            if (updateErr) return onFailure(updateErr);

            return onSuccess();
          }
        );
      }
    }
  );
}

module.exports = {
  registerUser,
  authenticateUser,
  updateTimeLineData
};

