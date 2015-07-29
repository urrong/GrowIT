var gpio = require("rpi-gpio");
var connect = require("connect");
var v4l2camera = require("v4l2camera");

gpio.setup(8, gpio.DIR_OUT);
app = connect();

app.use("/on", function(req, res, next){
    gpio.write(8, true);
    res.end();
});

app.use("/off", function(req, res, next){
    gpio.write(8, false);
    res.end();
});

//app.listen(80);
console.log("server online");

process.on("SIGINT", function(){
    console.log("\nexiting");
    gpio.destroy();
    setTimeout(process.exit, 100);
});

var cam = new v4l2camera.Camera("/dev/video0");
cam.start();
cam.capture(function(success){
    var rgb = cam.toRGB();
    require("fs").writeFileSync("result.raw", Buffer(rgb));
    cam.stop();
});
