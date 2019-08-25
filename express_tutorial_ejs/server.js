var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// express-session은 모듈이 직접 쿠키에 접근한다.
var session = require('express-session');
// fs는 node.js의 내장모듈이다. 나중에 파일을 열기 위함이다.
var fs  = require('fs');

//라우터 모듈인 main.js를 불러와서 app에 전달해준다.
//var router = require('./router/main')(app);

// 서버가 읽을 수 있도록 HTML의 위치를 정의해준다.
app.set('views', __dirname + '/views');
// 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정한다.
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
   console.log("Express server has started on port 3000");
});

// css파일 사용하기
app.use(express.static('public'));

//app.use()는 응용프로그램에 middleware를 바인딩하기 위한 것.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// secret : 쿠키를 임의로 변조하는 것을 방지하기 위한 sign값. 원하는 값을 넣으면 됌.
// resave : 세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값. express-session
// saveUninitialized :  uninitialized 세션이란 새로 생겼지만 변경되지 않은 세션을 의미한다.
app.use(session({
   secret : "@#@$MYSIGN#@$#$",
   resave: false,
   saveUninitialized: true
}));

//이 코드는 router. router에서 fs를 사용할 수 있도록 인자에 추가해줬음.
var router = require('./router/main')(app, fs);


//Router로 Request처리하기
//브라우저에서 Request가 왔을 때 서버에서 어떤 작업을 할 지 Router를 통하여 설정해주어야한다.


// 'http://localhost:3000/' 를 request 해줬을 때, 브라우저에 'Hello World'가 출력됌.
// app.get('/', function(req, res){
//     res.send('Hello World');
// });

// 라우터 코드는 서버 코드와 다른 파일에 작성해야하는게 좋은 코딩 습관이다.

