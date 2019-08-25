var express = require('express');
var app = express();
var server = app.listen(3000, function(){
   console.log("Express server has started on port 3000");
});

//Router로 Request처리하기
//브라우저에서 Request가 왔을 때 서버에서 어떤 작업을 할 지 Router를 통하여 설정해주어야한다.

// 'http://localhost:3000/' 를 request 해줬을 때, 브라우저에 'Hello World'가 출력됌.
app.get('/', function(req, res){
    res.send('Hello World');
});
