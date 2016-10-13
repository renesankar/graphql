var Express = require('express');
var GraphHTTP = require('express-graphql');
var Schema = require('./schema');

//config
const APP_PORT = 3000;

const app = Express();

app.use('/graphql', GraphHTTP({
   schema: Schema,
   pretty: true,
   graphiql: true,
}));

app.listen(APP_PORT, function(){
  console.log('App listening on port - '+ APP_PORT);
});
