

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


//функция входа 
	function login_2(){
		 var email = $("#email").val();
		 var pwd = $("#pwd").val();
		 var user = {};
		 var data = {};
		 data.login=email;
		 data.password=pwd;
		 user.method="login";
		 user.data=data;
		 var requery=JSON.stringify(user);		
		 if (email != '' && pwd != ''){
			 
	
   		 var login = $.ajax({		
          url:'/api/user',
          type:'post',
		  data: 'data='+ requery,	
		success: function(res) {
						var pre = {};
						pre = JSON.parse(res);
						if (pre.login==1)
							{
							location.reload();
							}
							else
							{
							$('#err').html('Неверный логин или пароль');	
							}
						}
		 })}		
   		};
//выход
function logout_2(){
	method = "exit";
	var logout = {};
	logout.method="exit"
	$("#hello").html('<h5 class=pull-right id=hello>Вітаємо, <a href=# data-toggle=modal data-target=#myModal>увійти в особистий кабінет </a>')
	var requery=JSON.stringify(logout);
	var logout_ = $.ajax({	
	url:'/api/user',
   type:'post',
   data: 'data='+ requery,
   		success: function(res) {

							location.reload();

						}
	})	
};