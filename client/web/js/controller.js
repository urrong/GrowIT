function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open( "GET", theUrl, false );
    if (xmlHttp.readyState === 4){
        xmlHttp.send( null );
        if(xmlHttp.status === 200){
            //success
            return xmlHttp.responseText;
        } else {
            //error
            return "error";
        }
    }
    else{
        return "error";
    }
}

$(document).ready(function() {

    $('#start_water_button').click(function () {

        var response = httpGet("http://someurl.com/won");
        if (response === "error"){
            console.log("Error!");
        }
        else{
            console.log("Water started!");
        }

    });

    $('#stop_water_button').click(function () {
        var response = httpGet("http://someurl.com/woff");
        if (response === "error"){
            console.log("Error!");
        }
        else{
            console.log("Water stopped!");
        }
    });

    $('#camera_on_button').click(function () {
        var response = httpGet("http://someurl.com/con");
        if (response === "error"){
            console.log("Error!");
        }
        else{
            console.log("Camera is on!");
        }
    });

    $('#light_on_button').click(function () {
        var response = httpGet("http://someurl.com/lon");
        if (response === "error"){
            console.log("Error!");
        }
        else{
            console.log("Light is on!");
        }
    });

});
