//Router를 모듈화해서 exports함.
module.exports = function(app, fs){
    app.get('/', function(req, res){
        //render함수의 두번째 인자로 json데이터를 전달함으로써 페이지에서 데이터를 사용가능하게 된다.
        res.render('index', {
            title : "MY HOMEPAGE",
            length : 5
        });
    });
}

//router코드를 따로 작성해서 내보냈기 때문에 server.js에서 모듈로서 불러올 수 있게 됌.
