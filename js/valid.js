$(document).ready(function() { 



 
 $("#e_mail_reg").keyup(function(){
    
    var email = $("#e_mail_reg").val();
  
    if(email != 0)
    {
    if(isValidEmailAddress(email))
    {
    $("#validEmail").css({
  "background-image": "url('img/validyes.png')"
    });
	$("#validEmail").setAttribute("yes", 1)
    } else {
    $("#validEmail").css({
  "background-image": "url('img/validno.png')"
    });
    }
    } else {
    $("#validEmail").css({
  "background-image": "none"
    }); 
    }
  
    });
	 $("#lastname_reg").keyup(function(){
    
    var name = $("#lastname_reg").val();
  
    if(name != 0)
    {
    if(!isValidName(name))
    {
    $("#validLastname").css({
  "background-image": "url('img/validyes.png')"
    });
	$("#validLastname").setAttribute("yes", 1)
    } else {
    $("#validLastname").css({
  "background-image": "url('img/validno.png')"
    });
    }
    } else {
    $("#validLastname").css({
  "background-image": "none"
    }); 
    }
  
    });
		 $("#Name_reg").keyup(function(){
    
    var name = $("#Name_reg").val();
  
    if(name != 0)
    {
    if(!isValidName(name))
    {
    $("#validname").css({
  "background-image": "url('img/validyes.png')"
    });
		$("#validname").setAttribute("yes", 1)
    } else {
    $("#validname").css({
  "background-image": "url('img/validno.png')"
    });
    }
    } else {
    $("#validname").css({
  "background-image": "none"
    }); 
    }
  
    });

		 $("#second_name").keyup(function(){
    
    var name = $("#second_name").val();
  
    if(name != 0)
    {
    if(!isValidName(name))
    {
    $("#validSecondname").css({
  "background-image": "url('img/validyes.png')"
    });
		$("#validSecondname").setAttribute("yes", 1)
    } else {
    $("#validSecondname").css({
  "background-image": "url('img/validno.png')"
    });
    }
    } else {
    $("#validSecondname").css({
  "background-image": "none"
    }); 
    }
  
    });

$("#birthday").keyup(function(){
    
    var name = $("#birthday").val();
  
    if(name != 0)
    {
    if(isValidDate(name))
    {
    $("#validDate").css({
  "background-image": "url('img/validyes.png')"
    });
		$("#validDate").setAttribute("yes", 1)
    } else {
    $("#validDate").css({
  "background-image": "url('img/validno.png')"
    });
    }
    } else {
    $("#validDate").css({
  "background-image": "none"
    }); 
    }
  
    });

	 $("#number").keyup(function(){
    
    var name = $("#number").val();
  
    if(name.length != 0)
    {
    if(isValidTelephone(name) && name.length==10)
    {
    $("#validTelephone").css({
  "background-image": "url('img/validyes.png')"
    });
		$("#validTelephone").setAttribute("yes", 1)
    } else {
    $("#validTelephone").css({
  "background-image": "url('img/validno.png')"
    });
    }
    } else {
    $("#validTelephone").css({
  "background-image": "none"
    }); 
    }
  
    });
	
	
		 $("#passs").keyup(function(){
   
    var name = $("#passs").val();
  
    if(name.length != 0)
    {
		
    if(name.length>=6)
    {
    $("#validPass").css({
  "background-image": "url('img/validyes.png')"
    });	$("#validPass").setAttribute("yes", 1)
    } else {
    $("#validPass").css({
  "background-image": "url('img/validno.png')"
    });
    }
    } else {
    $("#validPass").css({
  "background-image": "none"
    }); 
    }
  
    });
	
	
			 $("#pwd2").keyup(function(){
   
    var name = $("#pwd2").val();
  
    if(name.length != 0)
    {
		
    if(name==$("#passs").val())
    {
    $("#validrePass").css({
  "background-image": "url('img/validyes.png')"
    });
		$("#validrePass").setAttribute("yes", 1)
    } else {
    $("#validrePass").css({
  "background-image": "url('img/validno.png')"
    });
    }
    } else {
    $("#validrePass").css({
  "background-image": "none"
    }); 
    }
  
    });
	
	
 $("#city").keyup(function(){
    
    var name = $("#city").val();
  
    if(name != 0)
    {
    if(!isValidName(name))
    {
    $("#validCity").css({
  "background-image": "url('img/validyes.png')"
    });
		$("#validCity").setAttribute("yes", 1)
    } else {
    $("#validCity").css({
  "background-image": "url('img/validno.png')"
    });
    }
    } else {
    $("#validCity").css({
  "background-image": "none"
    }); 
    }
  
    });
	

	

	
    });
	
function registration()
{
	if ($("#validEmail").yes==1 && $("#validLastname").yes==1 && $("#validname").yes==1 && $("#validSecondname").yes==1 && $("#validDate").yes==1 && $("#validTelephone").yes==1 && $("#validPass").yes==1 && $("#validrePass").yes==1 && $("#validCity").yes==1 && $('#accept_0').checked)
	{$('#submit_f').css({
  "class": "btn btn-success pull-right"
    })}
else
{
$('#submit_f').css({
  "class": "btn btn-success pull-right disable"
    })		
}
}	
  
    function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
    }
	
	function isValidName(name) {
    var pattern = new RegExp(/[^а-яіїєґ,А-ЯІЇЄҐ,']/);
    return pattern.test(name);
    }
  
  
  	function isValidTelephone(name) {
    var pattern = new RegExp(/^\d+$/);
    return pattern.test(name);
    }
  
  function isValidDate(val)
{
  var val_r = val.split("-");
  var curDate = new Date(val_r[2], val_r[1], val_r[0]);
  return (
    curDate.getFullYear() == val_r[2]
    && curDate.getMonth() == val_r[1]
    && curDate.getDate() == val_r[0]
  );
}