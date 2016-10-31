 function object_type_e()
 {
	var data = {
							method: "get",
						};
						var requery=JSON.stringify(data);
	$.ajax({
					url: "/api/objecttype",
					type: "post",
					data:'data='+ requery	,
					success: function(res){
						
						var result=JSON.parse(res);
						var type;

						/*type = $("<li/>",{class:"dropdown-submenu"}).html('<a class="test" id_type='+this.id+' onClick="list_object(this);">'+this.name+'<span class=caret></span></a>');*/
						var id_sub=this.id;
						/*var punkt=$('<ul/>',{class:"dropdown"});*/
							$.each(result.data,function() {
								
								
									
									$('#type_zaklad').append($('<tr/>',{}).html('<td id_type='+this.id+' onClick="list_object_e (this);"><a id_type='+this.id+' onclick="">'+this.name+'</a></td>'));
								
							})
						
						/*$(type).append($(punkt));
						$('#type_zaklad').prepend($(type));*/
				
					}					
	 
 })
 }
 
 function list_object_e (obj)
{
//	$('#list_object').attr('hidden', 'false');
	$('#list_names').text(obj.text);
					var id_type=$(obj).attr('id_type');
					var arr={};
					var data={};
					var if_this=[];
					arr.method="get_if";
					if_this[0]=["type","=",id_type];
					
					arr.data=if_this;
					var request=JSON.stringify(arr);
	                $.ajax({
                    url:"/api/object"
					, type:'POST'
                    , data:'data=' + request
                    , success: function(res) {
						var result = JSON.parse(res);
						if (result.data=="error")
							{$('#list_zaklad').html('<tr><td><center> (немає закладів відповідаючих критеріям) </center></td></tr>');}
						else
							{$('#list_zaklad').html(' ');
								$.each(result.data,function() {
								
								$('#list_zaklad').append($('<tr/>',{}).html('<td onClick="list_object(this);"><a href="/g2g/energo-efficiency/object/'+this.id+'" id_obj='+this.id+' onclick="">'+this.name+'</a></td>'));
							})	
							}
						$('#add_name_inst').attr('id_type', id_type);	
					}})
}
 function add_type()
 {var cont={};
 cont.name=$('#name_type').val();
	var data = {};
	data.method="post";
	data.data=cont;
						var requery=JSON.stringify(data);
	$.ajax({
					url: "/api/objecttype",
					type: "post",
					data:'data='+ requery	,
					success: function(res){
						
						var result=JSON.parse(res);
						if (result.data=="ok")
						{
							location.reload();
						}


				
					}					
	 
 })
 }
 
 
  function add_name()
 {var cont={};
 cont.name=$('#add_name_inst').val();
 cont.type=$('#add_name_inst').attr('id_type');
	var data = {};
	data.method="post";
	data.data=cont;
						var requery=JSON.stringify(data);
	$.ajax({
					url: "/api/object",
					type: "post",
					data:'data='+ requery	,
					success: function(res){
						
						var result=JSON.parse(res);
						if (result.data=="ok")
						{
							location.reload();
						}


				
					}					
	 
 })
 }