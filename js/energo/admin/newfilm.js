function Test() {
	var c=0;
	var i={};
$("#form_film").find("input,textarea,select").not('[type="submit"]').each(function() {
 var name=$(this).attr('id');
 
 i[name] = $(this).val();
 c++;
});
var query = {};
query.method = 'post';
query.data = i;
var requery = JSON.stringify(query);

	$.ajax({
					url: "/api/files",
					type: "post",
					data:'data='+ requery	,
					success: function(res){
						var result = JSON.parse(res);
						if (result.data=="error")
						{
							    $("#validCheck").css({
								"background-image": "url('/images/validno.png')"
								});							
						}
						else
						{
							    $("#validCheck").css({
								"background-image": "url('/images/validyes.png')"
								});
						}
						
					}
					
	});
console.log(i);
}

function Test_put() {
	var c=0;
	var i={};
$("#form_film").find("input,textarea,select").not('[type="submit"]').each(function() {
 var name=$(this).attr('id');
 
 i[name] = $(this).val();
 c++;
});
var query = {};
query.method = 'put';
query.id = $('#id_file').text();
query.data = i;
var requery = JSON.stringify(query);

	$.ajax({
					url: "/api/object",
					type: "post",
					data:'data='+ requery	,
					success: function(res){
						var result = JSON.parse(res);
						if (result.data=="error")
						{
							    $("#validCheck").css({
								"background-image": "url('/images/validno.png')"
								});							
						}
						else
						{
							    $("#validCheck").css({
								"background-image": "url('/images/validyes.png')"
								});
						}
						
					}
					
	});
console.log(i);
}