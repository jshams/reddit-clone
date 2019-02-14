const express = require('express')
const exphbs = require('express-handlebars');
const app = express()
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Set db
require('./data/reddit-db');
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);



// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



app.listen(3000, () => {
  console.log('App listening on port 3000!')
})


module.exports = app;
