//import Sequelize from 'sequelize';

'use strict';

const Sequelize = require('sequelize') ;
let _ = require('lodash');
let Faker = require('faker');

const conn = new Sequelize('graphql', 'homestead', 'secret', {
  host: '127.0.0.1',
  port: '33060',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

const Community = conn.define('community',{
  name: {
    type:Sequelize.STRING,
    allowNull:false
  },
  about: {
    type:Sequelize.STRING,
    allowNull:false
  }
});

const User = conn.define('user',{
  firstName: {
    type:Sequelize.STRING,
    allowNull:false
  },
  lastName: {
    type:Sequelize.STRING,
    allowNull:false
  },
  email: {
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      isEmail: true
    }
  }
});


//relationships
Community.hasMany(User);

conn.sync({force: true}).then(function () {
  // Table created
  return Community.create({
    name: 'i.am.mbk solutions - urban leauge ',
    about: 'i.am.mbk solutions - urban leauge Community description'
  }).then(function(community){
     _.times(10, function(){
      return community.createUser({
        firstName:Faker.name.firstName(),
        lastName:Faker.name.lastName(),
        email: Faker.internet.email()
      })
    })
  })
});

module.exports = conn;
