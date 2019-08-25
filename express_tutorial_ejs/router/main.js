//Router를 모듈화해서 exports함.
module.exports = function(app, fs){
    app.get('/', function(req, res){
        //render함수의 두번째 인자로 json데이터를 전달함으로써 페이지에서 데이터를 사용가능하게 된다.
        res.render('index', {
            title : "MY HOMEPAGE",
            length : 5
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
}

//router코드를 따로 작성해서 내보냈기 때문에 server.js에서 모듈로서 불러올 수 있게 됌.
