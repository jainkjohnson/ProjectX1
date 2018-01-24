const router = require('express').Router();
const TimlineThunks = require('./thunks.js');
const midWare = require('../middleware');

/**
 * Add timeline
 * @name addTimeLineData
 * request.body:
 * {
 *   title: '',
 *   content: ''
 * }
 */
router.post('/add_timeline', midWare.requiresLogin, (req, res, next) => {
  TimlineThunks.updateTimeLineData(
    {
      reqBody: req.body,
      reqSession: req.session
    },
    () => {
      res.status(200).send({
        message: 'success'
      });
    },
    (err) => {
      if (err) {
        res.status(404).send({
          message: err.error
        });
      } else {
        // unhandled error
        next(err);
      }
    }
  );
});

/**
 * Update timeline
 * @name updateTimeLineData
 * request.body:
 * {
 *   title: '',
 *   content: ''
 * }
 */
router.put(
  '/update_timeline/:time', midWare.requiresLogin, (req, res, next) => {
    TimlineThunks.updateTimeLineData(
      {
        reqBody: req.body,
        reqParams: req.params,
        reqSession: req.session,
        update: true
      },
      () => {
        res.status(200).send({
          message: 'success'
        });
      },
      (err) => {
        if (err) {
          res.status(404).send({
            message: err.error
          });
        } else {
          // unhandled error
          next(err);
        }
      }
    );
  }
);

/**
 * Delete timeline
 * @name deleteTimeLineData
 * request.body:
 * {
 *   title: '',
 *   content: ''
 * }
 */
router.put(
  '/delete_timeline/:time', midWare.requiresLogin, (req, res, next) => {
    TimlineThunks.updateTimeLineData(
      {
        reqBody: req.body,
        reqParams: req.params,
        reqSession: req.session,
        remove: true
      },
      () => {
        res.status(200).send({
          message: 'success'
        });
      },
      (err) => {
        if (err) {
          res.status(404).send({
            message: err.error
          });
        } else {
          // unhandled error
          next(err);
        }
      }
    );
  }
);

/**
 * List timeline
 * @name listTimeLineData
 * request.body:
 * {
 *   title: '',
 *   content: ''
 * }
 */
router.get('/timeline_list', midWare.requiresLogin, (req, res, next) => {
  TimlineThunks.listTimeline(
    {
      reqSession: req.session
    },
    (timelinedata) => {
      res.status(200).send({
        data: timelinedata
      });
    },
    (err) => {
      if (err) {
        res.status(404).send({
          message: err.error
        });
      } else {
        next(err);
      }
    }
  );
});

// export routes that they be used in other files
module.exports = router;
