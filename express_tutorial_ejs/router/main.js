//Router를 모듈화해서 exports함.
module.exports = function(app, fs){
    app.get('/', function(req, res){
        var sess = req.session;
        //render함수의 두번째 인자로 json데이터를 전달함으로써 페이지에서 데이터를 사용가능하게 된다.
        res.render('index', {
            title : "MY HOMEPAGE",
            length : 5,
            name : sess.name,
            username : sess.username
        });
    });

    app.get('/list', function(req, res){
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf8', function(err, data){
            console.log(data);
            res.end(data);
        });
    });

    app.get('/getUser/:username', function(req, res){
        fs.readFile( __dirname + "/../data/user.json", 'utf8', function(err, data){
            var users = JSON.parse(data);
            res.json(users[req.params.username]);
        })
    });

    app.post('/addUser/:username', function(req, res){
        var result = { };
        var username = req.params.username;

        //check req validity
        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        // load data & check duplication
        fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err, data){
            var users = JSON.parse(data);
            if(users[username]){
                //duplication found
                result["success"] = 0;
                result["error"] = "duplicate";
                res.json(result);
                return;
            }

            // add to data
            users[username] = req.body;

            //save data
            fs.writeFile(__dirname + "/../data/user.json",
                        JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                    result = {"success" : 1};
                    res.json(result);
                })
        })
    })

    app.put('/updateUser/:username', function(req, res){

        var result = {  };
        var username = req.params.username;

        // CHECK REQ VALIDITY
        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        // LOAD DATA
        fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
            var users = JSON.parse(data);
            // ADD/MODIFY DATA
            users[username] = req.body;

            // SAVE DATA
            fs.writeFile(__dirname + "/../data/user.json",
                JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                    result = {"success": 1};
                    res.json(result);
                })
        })
    });


    app.delete('/deleteUser/:username', function(req, res){
        var result = { };
        //LOAD DATA
        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data){
            var users = JSON.parse(data);

            // IF NOT FOUND
            if(!users[req.params.username]){
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }

            // DELETE FROM DATA
            delete users[req.params.username];

            // SAVE FILE
            fs.writeFile(__dirname + "/../data/user.json",
                JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                    result["success"] = 1;
                    res.json(result);
                    return;
                })
        })

    })

    //로그인 api
    app.get('/login/:username/:password', function(req, res){
        //세션 초기 설정
        var sess;
        sess = req.session;
        //세션 변수 선언

        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data){
          var users = JSON.parse(data);
          var username = req.params.username;
          var password = req.params.password;
          var result = {};

          if(!users[username]){
              //username not found
              result["success"] = 0;
              result["error"] = "not found";
              res.json(result);
              return;
          }

          if(users[username]["password"] == password){
              result["success"] = 1;
              sess.username = username;
              sess.name = users[username]["name"];
              res.json(result);
          }else{
              result["success"] = 0;
              result["error"] = "incorrect";
              res.json(result);
          }

        })
    })


    //로그아웃 api
    app.get('/logout', function(req, res){
        sess = req.session;
        if(sess.username){
            req.session.destroy(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/');
                }
            })
        }else{
            res.redirect('/');
        }
    })



}

//router코드를 따로 작성해서 내보냈기 때문에 server.js에서 모듈로서 불러올 수 있게 됌.
