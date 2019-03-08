const express = require('express')
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express()
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

require('dotenv').config();

// Set db
require('./data/reddit-db');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(cookieParser()); // Add this after you initialize express.

app.use(require('./middleware/check-auth'));

// Controllers
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);


app.listen(3000, () => {
  console.log('App listening on port 3000!')
})


module.exports = app;
