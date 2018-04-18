$(document).ready(function(){
	$("#test").click(function(){

		var result = $('input[type="checkbox"]:checked');
		if(result.length>0) {
            var resultString = "";
            result.each(function () {
                resultString += $(this).val() + " ";
            });
            $.ajax({
                type: 'POST',
                url: '/recipe',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({"search": resultString}),
                success: function (data) {
                    console.log(data);
                    for (var i = 0; i < data.length; i++)
						//var url = window.location.href + "/" + "resultpage";
                        $("<div class='well'><div class='row'><div class='col-xs-9'><strong><em>" + data[i].name + "</em></strong><ul><li>"+ data[i].ingredients.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) +"</li></ul></div><div class='col-xs-3'>"+"<div class='col-xs-3'><form><input class='btn btn-danger' type='button' value='Link' onclick='window.location.href=&quot;"+data[i].url+"&quot;'/></form></div></div></div></div>").appendTo($("#dataId")).hide().slideDown("fast");
                }
            });
        }
		else{
			alert("No checkbox checked");
		}

	});

	//<li><a href='"+data[i].url"'>"Hello"</a></li>
	//<ul><li>" + data[i].name + "</li></ul><form><input class='btn btn-danger' type='button' value='Link' onclick='window.location.href=&quot;"+data[i].url+"&quot;'/></form>
});
