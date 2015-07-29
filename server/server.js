var gpio = require("rpi-gpio");
var connect = require("connect");
var serveStatic = require("serve-static");
var v4l2camera = require("v4l2camera");
var JPEG = require("jpeg").Jpeg;

gpio.setup(8, gpio.DIR_OUT);
app = connect();

app.use("/won", function(req, res, next){
    gpio.write(8, true);
    res.end("True");
});

app.use("/woff", function(req, res, next){
    gpio.write(8, false);
    res.end("True");
});

var streamResponse = null;
app.use("/stream.mjpg", function(req, res, next){
    console.log("client connected");
    res.writeHead(200, {"Content-type": "multipart/x-mixed-replace; boundary=--jpgboundary"});
    streamResponse = res;
});

app.use(serveStatic(__dirname + "/public"));

app.listen(8080);
console.log("server online");

process.on("SIGINT", function(){
    console.log("\nexiting");
    gpio.destroy();
    setTimeout(process.exit, 100);
});

var cam = new v4l2camera.Camera("/dev/video0");
var format = cam.configGet();
format.width = 320;
format.height = 240;
cam.configSet(format);
console.log(cam.configGet());
//console.log(cam.formats);

cam.start();
cam.capture(function loop(success) {
    if(!success){
        console.log("Capture failed");
    }
    else{
        var jpeg = new JPEG(Buffer(cam.toRGB()), cam.width, cam.height);
        var image = jpeg.encodeSync();
        if(streamResponse){
            streamResponse.write("--jpgboundary\n");
            streamResponse.write("Content-type: image/jpeg\n");
            streamResponse.write("Content-length: " + image.length + "\n\n");
            streamResponse.write(image);
        }
    }
    //require("fs").writeFileSync("image.jpg", image);
    cam.capture(loop);
});
