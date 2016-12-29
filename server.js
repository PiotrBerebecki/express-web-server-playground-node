const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');


// to observe changes in hbs files using nodemon:
// nodemon server.js -e js,hbs


const port = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
  const {statusCode} = res;
  const { ip, method, url } = req;
  const ua = req.headers['user-agent'];
  const dateOptions = { year: 'numeric', month: 'short', day: '2-digit', 
                        hour: '2-digit', minute: '2-digit', second: '2-digit',
                        timeZoneName: 'short' };
  const now = new Date().toLocaleDateString('en-GB', dateOptions);
  
  fs.appendFile('server.log', `${ip} -- [${now}] ${method} ${url} ${statusCode} ${ua}\n`, (err) => {
    if (err) {
      console.log('Sorry unable to append to server.log');
    }
  });
  next();
});

// If next is not called then we
// will not move on beyond this point
// It can be used to redirect all users
// to a temporary page
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });


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

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
