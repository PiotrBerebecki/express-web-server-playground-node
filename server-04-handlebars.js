const express = require('express');
const path = require('path');
const hbs = require('hbs');

// to observe changes in hbs files using nodemon:
// nodemon server.js -e js,hbs

const app = express();

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('capitalise', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Handlebars website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
