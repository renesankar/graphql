const Db = require('./db');

Db.models.community.findAll().then(function(users) {
  console.log(users);
});
