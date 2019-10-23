require('rootpath')();
const cors = require('cors');
const path = require('path'); // 
const { spawn, ChildProcess } = require('child_process');
const http = require("http")
const WebSocket = require("ws")
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
const jwt = require('_helpers/jwt');
const SCRIPT_PATH = path.join(__dirname, 'scripts/script.py');

let {PythonShell} = require('python-shell')

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));



app.use('/users', require('./users/users.controller'));
app.use('/details', require('./details/detail.controller'));

app.use(express.static('../client'));




var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },

    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        console.log(req.file);
        console.log(req.originalname);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        } else {

            return res.json();
        }


    });
});

var Data;


//var PythonShell = require('python-shell');
app.get('/getUserData/:id', callD_alembert);
	//req.params.id

 function callD_alembert(req, res) {
 console.log(req.params.id)
  var options = {
    pythonPath: '/usr/bin/python',
    args:
    [
        req.params.id
    ]
  }
  PythonShell.run('scripts/script.py', options, function (err, data) {
	console.log('dddddddddddddddddddddddddddddddddddddddddddddd'+ data)
	console.log('dddddddddddddddddddddddddddddddddddddddddddddd'+ err)
    if (err) res.send("123");
    //res.send(data.toString())
	 res.json({'data':data})
  });
}

app.get('/getUserData_old/:id',   function (req, res) {

    console.log("This is the numbersdsds " + req.params.id);
    // const scriptProcess = runScript("foobar")
    // res.set('Content-Type', 'text/plain');
    // scriptProcess.stdout.pipe(res)
    // scriptProcess.stderr.pipe(res)

    var porcessArg = [
    ]
    /**
     * @param  req.params.id {String}
     * @return {ChildProcess}
     */
//      function runScript(param) {
//passing the id to python script
        //let pythonData =  spawn('python', [  "-u", SCRIPT_PATH, "--foo",  req.params.id]);
        //return pythonData;    
   // }

    //const  subprocess = runScript()
	var subprocess = spawn('python', [  "-u", SCRIPT_PATH, "--foo",  req.params.id]);
    //console.log(Data);
    // print output of script
    	subprocess.stdout.on('data', (data) => {
        // console.log("Hey There"+ data);
         console.log(`data:${data}`);
         console.log("Hello World" + `${data}`);
         this.Data = `${data}`;
         console.log("asdsadsadsad" + this.Data);
    	//return  res.json({"data" : this.Data});
 	//res.statusCode = 200;
	//res.setHeader('Content-Type', 'text/plain');
//	res.end('Cannot ' + req.method + ' ' + req.url);
    	//return  res.json({"data" : "123"});

    	return  res.json({"data" : data});
    });
    subprocess.stderr.on('data', (data) => {
        // console.log('Second Param');
        // console.log(`error:${data}`);
    	return  res.json({"data" : "123"});
    });
    subprocess.on('close', () => {

        // console.log("Closed");
    	return  res.json({"data" : "123"});
    });
    
    	//return  res.json({"data" : this.Data});
});

function runScriptInWebsocket(id, ws) {
    const child = runScript("foobar")
    child.stdout.on('data', (data) => {
        ws.send(`${id}:${data}`);
    });
    child.stderr.on('data', (data) => {
        ws.send(`${id}:error:\n${data}`);
    });
    child.on('close', () => {
        ws.send(`${id}:done`);
    });
}


app.listen('4000', function () {
    console.log('running on 4000...');

});
