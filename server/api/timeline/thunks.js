const User = require('../../modals/user');
const utils = require('../../utils');
const config = require('../../config');

function listTimeline(params, onSuccess, onFailure) {
  const id = params.reqSession.userId;

  User.findOne(
    { _id: id },
    'timeline'
  ).exec((err, user = []) => {
    console.log(user);
    if (err) return onFailure(err);

    if (!user) {
      return onFailure({
        status: 401,
        error: 'user not found'
      });
    }

    return onSuccess(user.timeline);
  });
}

function updateTimeLineData(params, onSuccess, onFailure) {
  const reqBody = params.reqBody;
  const time = params.reqParams || null;
  const remove = params.remove || false;

  User.findOne(
    { _id: params.reqSession.userId },
    (err, user) => {
      if (err) return onFailure(err);
      if (user) {
        let userTimeline = user.timeline || [];
        let updateTimeLine = userTimeline.find(user => ~~user.time === ~~time.time)

        if (time && updateTimeLine) {
          if (remove) {
            delete userTimeline[time.time];
          } else if (time) {
            // update process

            userTimeline = userTimeline.map((user) => {
              if(~~user.time === ~~time.time) {
                reqBody.time = new Date().getTime();

                return utils.getObjOwnProps(
                  config.USER_TIMELINE_SCHEMA_PROPS,
                  reqBody,
                  updateTimeLine
                );
              }
    
              return user;
            })
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

          return onFailure({
            status: 404,
            error: 'timeline not fount'
          });
        } else {
          const keyForTimelineData = new Date().getTime();
          reqBody.time = keyForTimelineData;

          // add new timeline
          userTimeline.push(utils.getObjOwnProps(
            config.USER_TIMELINE_SCHEMA_PROPS,
            reqBody,
            {}
          ));
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
  updateTimeLineData,
  listTimeline,
};
