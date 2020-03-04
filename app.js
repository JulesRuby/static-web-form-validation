// Establish required node package modules
const path = require('path');
const express = require('express');
const ejs = require('ejs');
// Establish my personal modules
const pageAttributes = require('./pageAttributes')

const app = express();

// Define the 'view engine' that we'll be using. In this case it will be ejs, but it could be something like pug or handlebars
app.set('view engine', 'ejs');

// Retrieve information from pageAttributes to render index.ejs
app.get('/', function(req, res) {
  res.render('index', pageAttributes.index);
});

// Retrieve information from pageAttributes to render about.ejs
app.get('/about', function(req, res) {
  res.render('about', pageAttributes.about);
});

// Retrieve information from pageAttributes to render gallery.ejs
app.get('/gallery', function(req, res) {
  res.render('gallery', pageAttributes.gallery);
});

// Retrieve information from pageAttributes to render blog.ejs
app.get('/blog', function(req, res) {
  res.render('blog', pageAttributes.blog);
});


app.use(express.static(path.join(__dirname, 'public'))); // Research a little more into how this mechanism operates, I only kind of get it
// Also it's worth mentioning that the path.join thing will result in an implicit next() if the specified directory is not found

app.use(function(req,res,next) {
  res.status(404);
  res.send(`404 not found, maybe I specified the wrong directory, or it doesn't exist... yet?`);
});

const PORT = process.env.PORT || 3000; // I have to look into this snippet as well, it was glossed over pretty quick
// RIGHT, I think that the above code indicated that the PORT is equal to the PORT that the environment/process is working on. If not specified, the port defaults to being 3000

app.listen(PORT, function() {
  console.log(`console log indicating that this is listening to the specified PORT, which is ${PORT}`);
});
