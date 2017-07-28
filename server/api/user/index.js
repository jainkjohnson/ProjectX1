const router = require('express').Router();
const User = require('../../modals/user');

router.post('/register', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  User.create({ email, username, password },
    (err, user) => {
      // user: To get the response of mongoose create function
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

          return res.status(400).send({ error: `${dupField} already exits` });
        }
      }
      // [TODO]: Change constants to seperate file

      return res.status(200).send({ message: 'success' });
    }
  );
});

// export routes that they be used in other files
module.exports = router;
