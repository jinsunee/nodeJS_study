//Router를 모듈화해서 exports함.
module.exports = function(app, fs){
    app.get('/', function(req, res){
        res.render('index.html');
    });
    app.get('/about', function(req, res){
        res.render('about.html');
    });
}

//router코드를 따로 작성해서 내보냈기 때문에 server.js에서 모듈로서 불러올 수 있게 됌.
