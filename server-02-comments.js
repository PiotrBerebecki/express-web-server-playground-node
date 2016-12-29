const express = require('express');


// Create express app
var app = express();


// Handle get requests using middleware
// to serve static html files
// app.use(express.static(__dirname + '/public'));
// visit: http://localhost:3000/help.html
// However on windows __dirname will give you path
// with backslashes instead of forward slashes so you
// will get mix-up of backslashes and forward slashes :(
// C:\Users\username\Desktop\express-web-server-node/public
// instead of (on windows):
// C:\Users\username\Desktop\express-web-server-node\public


// To avoid the issue you should use node's path module
// BEFORE :(
console.log('concat with +:', __dirname + '/public');
// C:\Users\username\Desktop\express-web-server-node/public

// AFTER :)
const path = require('path');
console.log('concat with path:', path.join(__dirname, 'public'));
// C:\Users\username\Desktop\express-web-server-node\public  (windows)
// C:/Users/username/Desktop/express-web-server-node/public  (unix)

// so to serve static files you would do:
app.use(express.static(path.join(__dirname, 'public')));


// Handle get requests manually but this may not be practical
app.get('/login', (req, res) => {
  res.send('<h2>Login here</h2>'); // body data of the response
});

app.get('/some-data', (req, res) => {
  res.send({
    server: 'Express',
    language: 'JavaScript'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.get('/', (req, res) => {
  res.send('Hello world in root');
});

app.get('*', (req, res) => {
  res.send('Hello world anywhere');
});


// Bind app to port
app.listen(3000, () => {
  console.log('Listening on port 3000; visit http://localhost:3000');
});
