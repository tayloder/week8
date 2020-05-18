var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 41286);

app.get('/',function(req,res){
 res.render('home');
});

app.get('/submit-form',function(req,res){
 var queryParams = [];
 var formData = {};
 for (var i in req.query){
   queryParams.push({'name':i,'value':req.query[i]})
 }
 formData.queryData = queryParams;
 res.render('get-submit', formData);
});

app.post('/submit-form', function(req,res){
  var queryParams = [];
  var bodyParams = [];
  var formData = {};
  for (var i in req.query){
    queryParams.push({'name':i,'value':req.query[i]})
  }
 for (var j in req.body){
   bodyParams.push({'name':j,'value':req.body[j]})
 }
 formData.queryData = queryParams;
 formData.bodyData = bodyParams;
 res.render('post-submit', formData);
});

app.use(function(req,res){
 res.status(404);
 res.render('404');
});

app.use(function(err, req, res, next){
 console.error(err.stack);
 res.type('plain/text');
 res.status(500);
 res.render('500');
});

app.listen(app.get('port'), function(){
 console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
