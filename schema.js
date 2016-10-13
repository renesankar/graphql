'use strict';

var {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLSchema
} = require('graphql');
const Db = require('./db');

const Community = new GraphQLObjectType({
  name: 'Communnity',
  description: 'Myndmatch communities',
  fields: function(){
    return{
      id: {
        type:GraphQLInt,
        resolve(community){
          return community.id;
        }
      },
      name: {
        type:GraphQLString,
        resolve(community){
          return community.name;
        }
      },
      about: {
        type:GraphQLString,
        resolve(community){
          return community.about;
        }
      },
      user: {
        type: new GraphQLList(User),
        resolve(community) {
          return community.getUsers();
        }
      }
    }
  }
});

const User = new GraphQLObjectType({
  name: 'User',
  description : 'Myndmatch user',
  fields : function(){
    return{
      id: {
        type:GraphQLInt,
        resolve(user){
          return user.id;
        }
      },
      firstName: {
        type:GraphQLString,
        resolve(user){
          return user.firstName;
        }
      },
      lastName: {
        type:GraphQLString,
        resolve(user){
          return user.lastName;
        }
      },
      email: {
        type:GraphQLString,
        resolve(user){
          return user.email;
        }
      }
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description : 'Myndmatch Query',
  fields: function(){
    return {
      users: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.user.findAll({where: args});
        }
      },
      communities: {
        type: new GraphQLList(Community),
        resolve(root, args) {
          return Db.models.community.findAll({where: args});
        }
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

module.exports = Schema;
