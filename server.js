const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var index = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use('/', index);

app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err;
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => {
    console.log('Server is up on the port 8080');
});