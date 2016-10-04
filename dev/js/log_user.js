

function user_info ()
{ var arr = {};
arr.method="user_info";
	var request=JSON.stringify(arr);
	var results=[];
	                $.ajax({
                    url:"api/user"
					, type:'POST'
                    , data:'data=' + request
                    , success: function(res) {
						var result = JSON.parse(res);
						
						if (result.data=="error")
							{return "anon";}
						else
							{return result.data;}
						
					}})
					
}

function login_if ()
{
	var arr = {};
arr.method="user_info";
	var request=JSON.stringify(arr);
	var results=[];
	                $.ajax({
                    url:"api/user"
					, type:'POST'
                    , data:'data=' + request
                    , success: function(res) {
						var result = JSON.parse(res);
						
						if (result.data!=="error")

							{$("#hello").html('Вітаю, '+ result.data.login +'( '+result.data.surename+' '+result.data.name+' '+result.data.fathername+' ) '+' <a href=# id=logout_ onclick="logout_1();">Вийти</a> ');}
						
					}})
	/*var info = user_info();
	console.log("DATA", info)
	if (info!=="anon")
	{$("#hello").html('Вітаю, '+ info.login +'( '+info.surename+' '+info.name+' '+info.lastname+' ) '+' <a href=# id=logout_ onclick="logout_1();">Вийти</a> ');}
	*/
}