var express = require('express');
var app = express();
//라우터 모듈인 main.js를 불러와서 app에 전달해준다.
var router = require('./router/main')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});