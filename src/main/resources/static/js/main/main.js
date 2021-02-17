$(document).ready(function () {
    var option = { 
        url: "main/ajaxTest",
        type: "get",
        data: $("#input_test").serialize()
    }
    var req = new Request();
    req.ajax(option);

    option.url = "main/postTest";
    option.type = "post";
    option.data = $("#input_test").serialize();

    req.ajax(option);

    console.log($("#input_test").serialize());
})

function urlSerialize(obj) {

}

function Request(){}

Request.prototype.ajax = function(option) {
    console.log(option);
    $.ajax({
        url: option.url,
        type: option.type,
        data: option.data,
        success: function(result) {
            console.log(option.type + " success!!");
            console.log(result);
        },
        error: function(result) {
            console.log("error");
        }
    })
}
