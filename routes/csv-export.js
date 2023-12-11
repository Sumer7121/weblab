const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.ensureAuthenticated, async function (req, res, next) {
  try {
    let users = await User.find();
    let csv = 'Register Date,Email,Password,First Name,Last Name,Role\n';

    for (let user of users) {
      csv += `${user.registerDate},${user.email},${user.password},${user.firstName},${user.lastName},${user.role}\n`;
    }

    const filename = 'users.csv';

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
    res.send(csv);
  } catch (error) {
    next(error);
  }
});

module.exports = router;