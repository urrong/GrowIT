function httpGet(theUrl)
{
    $.ajax({
        type: "GET",
        url: theUrl,
        dataType: "text",
        success: function(response) {
            return response;
        },
        error: function(response) {
            return "error";
        }
    });
}

var won = false;
var lon = false;

$(document).ready(function() {

    $('#toggle_water_button').click(function () {

        var parm = "won";
        if (won){
            won = false;
            parm = "woff";
            $('#toggle_water_button').val("Turn the water on");
        }
        else{
            won = true;
            $('#toggle_water_button').val("Turn the water off");
        }

        var response = httpGet("http://someurl.com/" + parm);
        if (response === "error"){
            console.log("Error!");
        }
        else{
            if(response === "true"){
                console.log("Everything is OK!");
            }
            else if(response === "false"){
                console.log("The action cannot be preformed!");
            }

        }

    });

    $('#toggle_light_button').click(function () {

        var parm = "lon";
        if (lon){
            lon = false;
            parm = "loff";
            $('#toggle_light_button').val("Turn the light on");
        }
        else{
            lon = true;
            $('#toggle_light_button').val("Turn the light off");
        }

        var response = httpGet("http://someurl.com/" + parm);
        if (response === "error"){
            console.log("Error!");
        }
        else{
            if(response === "true"){
                console.log("Everything is OK!");
            }
            else if(response === "false"){
                console.log("The action cannot be preformed!");
            }
        }
    });


});
