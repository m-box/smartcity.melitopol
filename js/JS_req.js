 function object_type()
 {
	var data = {
							method: "get",
						};
						var requery=JSON.stringify(data);
	$.ajax({
					url: "api/objecttype",
					type: "post",
					data:'data='+ requery	,
					success: function(res){
						
						var result=JSON.parse(res);
						var type;
						$.each(result.data,function() {
						if (this.sub_type=="")	
						type = $("<li/>",{class:"dropdown-submenu"}).html('<a class="test" id_type='+this.id+' onClick="list_object(this);">'+this.name+'<span class=caret></span></a>');
						var id_sub=this.id;
						var punkt=$('<ul/>',{class:"dropdown"});
							$.each(result.data,function() {
								if (this.sub_type==id_sub)
								{
									
									$(punkt).append($('<li/>',{}).html('<a href=# id_type='+this.id+' onClick="list_object(this);">'+this.name+'</a>'));
								}
							})
						
						$(type).append($(punkt));
						$('#object_type').prepend($(type));
						})
					}					
	 
 })
 }

function list_object (obj)
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
                    url:"api/object"
					, type:'POST'
                    , data:'data=' + request
                    , success: function(res) {
						var result = JSON.parse(res);
						if (result.data=="error")
							{$('#list_names').append(' (немає закладів відповідаючих критеріям)');}
						else
							{$.each(result.data,function() {
								
								$('#list_object').append($('<li/>').append($('<a/>',{class:"list-group-item", text:this.name})));
							})	
							}
					}})
}
//функция входа 
	function login_1(){
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
          url:'api/user',
          type:'post',
		  data: 'data='+ requery,	
		success: function(res) {
						var pre = {};
						pre = JSON.parse(res);
						if (pre.login==1)
							{
							login_if();
							$('#myModal').modal('hide');
							}
							else
							{
							$('#err').html('Невірний логін або пароль');	
							}
						}
		 })}		
   		};
//выход
function logout_1(){
	method = "exit";
	var logout = {};
	logout.method="exit"
	$("#hello").html('<h5 class=pull-right id=hello>Вітаємо, <a href=# data-toggle=modal data-target=#myModal>увійти в особистий кабінет </a>')
	var requery=JSON.stringify(logout);
	var logout_ = $.ajax({	
	url:'api/user',
   type:'post',
   data: 'data='+ requery
	})	
};
//отправка запроса на зпись данных в таблицу из energosad в таблицу energy_object     
	function send_req_object(){
		//var id_object = $("#id_object")
		var esad_calend = $("#esad_calend").val();
		var name_inst = $("#name_inst").val();
		var pib_kerivn = $("#PIB_kerivn").val();
		var geo = $("#geo").val();
		var area_inst = $("#area_inst").val();
		var quantity_flr = $("#quantity_flr").val();
		var quantity_stf = $("#quantity_stf").val();
		var tel_number = $("#tel_number").val();
		var fax = $("#fax").val();
		var site_inst =$("#site_inst").val();
		var email_inst = $("#email_inst").val();
		var req_obj = {};
		var data = {};
		//data.id_object = id_object
		data.esad_calend=esad_calend;
		data.name=name_inst;
		data.director=pib_kerivn;
		data.geo=geo;
		data.ploshad=area_inst;
		data.etaji=quantity_flr;
		data.personal=quantity_stf;
		data.telephone=tel_number;
		data.fax=fax;
		data.site_url=site_inst;
		data.e_mail=email_inst;
		req_obj.method="put";
		req_obj.data=data;
		var requery=JSON.stringify(req_obj);
		var send_req_object_ = $.ajax({
					url: "api/object",
					type: "post",
					success: function(html){  
                        $("#content").html(html);  
                    },
					data:'data='+ requery
				
			})	
		};
//отправка запроса на зпись данных в таблицу из energosad в таблицу energy_more
function send_req_more(){
		//var id_obj = $('#id_obj').val();
 		var opal_area = $("#opal_area").val();
 		var area_zdan = $("#area_zdan").val();
 		var opal_volume = $("#opal_volume").val();
 		var area_windw = $("#area_windw").val();
		var heat_type = $("#heat_type option:selected").val();
 		var type_fuel = $("#type_fuel option:selected").val();
 		var material_wall = $("#material_wall option:selected").val();
 		var typ_pokrivli = $("#typ_pokrivli option:selected").val();
 		var	 heat_lich = $("#heat_lich option:selected").val();
 		var e_lich = $("#e_lich option:selected").val();
		var water_lich = $("#water_lich option:selected").val();
		var req_more = {};
		var data = {};
		//data.id_object = id_obj
		data.opaluvalna_plosha=opal_area;
		data.zagalni_obyem=area_zdan;
		data.opaluvalniy_obyem=opal_volume;
		data.plosha_vikon=area_windw;
		data.type_opalen=heat_type;
		data.type_walls=material_wall;
		data.type_roof=typ_pokrivli;
		data.type_opalen=heat_lich;
		data.lich_electro=e_lich;
		data.lich_water=water_lich;
		req_more.method="put";
		req_more.data=data;
		var requery=JSON.stringify(req_more);
		var send_req_more_ = $.ajax({
		url: "api/more",
		type: "post",
		success: function(html){  
                        $("#content").html(html);  
                    },
		data:'data='+ requery
		})
	};
//вносим данные в data
//кол-во людей в заведении
function kilk_spozh_(){
	//var id_object = $("#id_object").val
	var kilkist_vidviduv = $("#kilk_spozh").val();
	var date_kilk_spozh = $("#date_kilk_spozh").val();
	var kilk_spozh = {};
	var data = {};
	//data.id_object = id_obj
	data.kilkist_vidviduv = kilkist_vidviduv;
	data.date_kilkist_vidviduv = date_kilk_spozh;
	kilk_spozh.method="put";
	kilk_spozh.data=data;
	var requery=JSON.stringify(kilk_spozh);
	var kilk_vidviduv = $.ajax({
			url: "api/more",
			type:'post',
			success: function(html){  
                        $("#content").html(html);  
                    },
			data:'data='+ requery
		
 })
};
//площадь окон
function area_windws_(){
	//var id_object = $("#id_object").val();
	var area_windws = $("#area_windws").val();
	var data_area_windws = $("#data_area_windws").val();
	var area_windws_ = {};
	var data = {};
	//data.id_object = id_obj
	data.plosha_metal_vikon = area_windws;
	data.date_plosha_metal_vikon = data_area_windws;
	area_windws_.method="put";
	area_windws_.data=data;
	var requery=JSON.stringify(area_windws_);
	var area_windws_ = $.ajax({
	url:"api/more",
	type:'post',
	data: 'data='+ requery
	})
};
//кол-во потребленного эл-ва в кВт.
function send_req_electro(){
//data.id_object = id_obj
	var kolkW = $("#KolkW").val();
	var date_kolkW = $("#date_kolkW").val();
	var kolkW_ = {};
	var data = {};
	//var id_object = $("#id_object").val();
	data.electro=kolkW;
	data.date_electro=date_kolkW;
	kolkW_.method="put";
	kolkW_.data=data;
	var requery=JSON.stringify(kolkW_);
	var send_req_gas_ = $.ajax({
		url:'api/data',
		type:'post',
		success: function(html){  
                        $("#content").html(html);  
                    },
		data:'data='+ requery
 })
};
//кол-во потребленного газа
function send_req_gas(){
//data.id_object = id_obj
	var gas = $("#gas").val();
	var data_gas = $("#data_gas").val();
	var gas_ = {};
	var data = {};
	//data.id_object = id_obj
	data.gas=gas;
	data.date_gas=data_gas;
	gas_.method="put";
	gas_.data=data;
	var requery=JSON.stringify(gas_);
	var send_req_gas_ = $.ajax({
		url:'api/data',
		type:'post',
		success: function(html){  
                        $("#content").html(html);  
                    },
		data:'data='+ requery
 })
};
//кол-во потребленного тепла
function send_req_teplo(){
//var id_object = $("#id_object").val();
	var teplo = $("#teplo").val();
	var data_teplo = $("#data_teplo").val();
	var teplo_ = {};
	var data = {};
	//data.id_object = id_object
	data.teplo=teplo;
	data.data_teplo=data_teplo;
	teplo_.method="put";
	teplo_.data=data;
	var requery=JSON.stringify(teplo_);
	var send_req_teplo_ = $.ajax({
		url: 'api/data',
		type:'post',
		success: function(html){  
                        $("#content").html(html);  
                    },
		data: 'data='+ requery
	})
};
//кол-во потребленной воды
function send_req_water(){
//var id_object = $("#id_object").val();
	var water = $("#water").val();
	var water_date = $("#data_water").val();	
	var water_ = {};
	var data = {};
	//data.id_object = id_obj
	data.water=water;
	data.water_date=water_date;
	water_.method="put";
	water_.data=data;
	var requery=JSON.stringify(water_);
	var send_req_water_ = $.ajax({
		url: 'api/data',
		type:'post',
		success: function(html){  
                        $("#content").html(html);  
                    },
		data:'data='+ requery
	})
};
//тарифы
	//электро
function send_req_taryf_electro(){
//var id_object = $("#id_object").val();
	var energo_taryf_ = $("#Taryf_electro").val();
	var energo_taryf_date = $("#date_electro").val();
	var energo_taryf_name = ("Electro");
	var e_taryf = {};
	var data = {};
	//data.id_object = id_obj
	data.param = energo_taryf_name;
	data.price = energo_taryf_;
	data.date=energo_taryf_date;
	e_taryf.method="put";
	e_taryf.data=data;
	var requery=JSON.stringify(e_taryf);
	var send_req_taryf_electro_ = $.ajax({
		url: 'api/tarif',
		type: 'post',
		data:'data='+ requery
	})	
};
	//газ
function send_req_taryf_gas(){
//var id_object = $("#id_object").val();
	var gas_taryf = $("#taryf_gas").val();
	var gas_taryf_date = $("#taryf_gas_date").val();
	var param = "Gas"
	var g_taryf = {};
	var data = {};
	//data.id_object = id_obj
	data.param = param;
	data.price = gas_taryf
	data.date = gas_taryf_date;
	g_taryf.method="put";
	g_taryf.data=data;
	var requery=JSON.stringify(g_taryf);
	var send_req_taryf_gas_ = $.ajax({
		url: '/api/data',
			type: 'post',
	data:'data='+ requery,
	success: function(data) {
            $('.results').html(data);
            }
	})	
};
	//тепло
function send_req_taryf_heat(){
	//var id_object = $("#id_object").val();
	var heat_taryf_ = $("#taryf_teplo").val();
	var heat_taryf_date = $("#taryf_teplo_date").val();
	var param = "Teplo"
	var h_taryf = {};
	var data = {};
	//data.id_object = id_obj
	data.param = param
	data.price=heat_taryf_;
	data.date=heat_taryf_date;
	h_taryf.method="put";
	h_taryf.data=data;
	var requery=JSON.stringify(h_taryf);
	var send_req_taryf_heat_ = $.ajax({
		url: 'api/data',
		type: 'post',
		data: 'data='+ requery,
	success: function(data) {
            $('.results').html(data);
            }
	})	
};
	//вода
  function send_req_taryf_voda(){
	//var id_object = $("#id_object").val();
	var water_taryf_put = $("#taryf_vodput").val();
	var water_taryf_vidh = $("#taryf_vidv").val();
	var water_taryf_date = $("#taryf_voda_date").val();
	var name_voda = "water";
	var w_taryf = {};
	var data = {};
	//data.id_object = id_obj
	data.param = name_voda
	data.price=water_taryf_put;
	//data.param=water_taryf_vidh;
	data.date=water_taryf_date;
	w_taryf.method="put";
	w_taryf.data=data;
	var requery=JSON.stringify(w_taryf);
	var send_req_taryf_water_ = $.ajax({
		url: '/api/data',
		type: 'post',
	data:'data='+ requery,
	success: function(data) {
            $('.results').html(data);
            }
       	})	
};
//GET
/*function tarifpicker (param, id)
{var param.result['date_picker'].toFixed(2);
var result;
var params={};
params.param=param ;
params.id=id;
	
var re=JSON.stringify(params);

		$.ajax({
		url: 'controllers/tarifpicker.php',
		async: false,
		type: 'post',
		data:'tarif='+re,
		success: function(res) {
		result = JSON.parse(res);
		
		}})
		return result;
}
*/

//get energo1
	function get_req_energo1(){
	var startDate = $("#startDate").text();
	var endDate = $("#endDate").text();
	var data = { method:"get_if",
				data: [
							["date",">=",startDate],
							["date","<=", endDate],						
					  ]	}
	
	var requery=JSON.stringify(data);
	var sub_req = $.ajax({
		url: 'api/data',
		type: 'post',
		data:'data='+ requery,
		success: function(res) {
		var result = JSON.parse(res);
		if (result.data!="error"){
var object=result.data;							
var mark=0;							
var value=$('input[name="optradio1"]:checked').val();
var tarif;
switch (value) {
  case "Кількість кВт":
    value='electro';
    break
    case "Кількість газу":
    value='gas';
    break
    case "Кількість води":
    value='water';
    break;
    case "Кількість тепла":
    value='teplo';
    break;
	    case "1":
    value='electro'; mark=1; tarif=tarifpicker(value, "1");
    break;
	    case "2":
    value='gas'; mark=1; tarif=tarifpicker(value, "1");
    break;
	    case "3":
    value='water'; mark=1; tarif=tarifpicker(value, "1");
    break;
	    case "4":
		{value='teplo'; mark=1; tarif=tarifpicker(value, "1");}
    break;
}

/*if (value=="Кількість кВт"){value='electro'}
else if (value=="Кількість газу"){value="gas"}
else if (value=="Кількість води"){value="water"}
else if (value=="Кількість тепла"){value="heat"};*/
var out = [];
var ch=0;


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);



 function drawChart() {
	 var data=[];
var pred;
var i=0;
	 $.each(object ,function() {
	
if (i==0){pred = this[value];
if (mark==0)
{data[i]=['Дата', 'Кількість'];}
else
{data[i]=['Дата', 'UAH'];}	
i++;}	
if (i!=0){
var colvo=this[value]-pred;
if (mark==0)
{data[i]=[this.date , colvo];}
else
{
	var sum=colvo*tarif.price;
	data[i]=[this.date , sum];
}	

i++; pred=this[value];
}})
console.log (data);
        var data = google.visualization.arrayToDataTable(data);
		 var options = {
          title: 'Показники',
          curveType: 'function',
          legend: { position: 'bottom' }
        }
        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }


        var options = {
          title: 'Данні',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);							
							
							
							
										}
										
										}})
}
//get energo2
	function get_req_energo2(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var data = {
				data: [
							["date",">=",startDate-1],
							["date","<=", endDate]						
					  ]	}
	var requery=JSON.stringify(data);
	var sub_req = $.ajax({
		url: 'api/data',
		type: 'post',
		data:'data='+ requery,
		success: function(res) {
		var result = JSON.parse(res);
		if (result.data=="error"){
							var data_r = {
							//
										}
	}}})
}
//get energo3
	function get_req_energo3(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var data = {
				data: [
							["date",">=",startDate-1],
							["date","<=", endDate],						
					  ]	}
	var requery=JSON.stringify(data);
	var sub_req = $.ajax({
		url: 'api/sobes',
		type: 'post',
		data:'data='+ requery,
		success: function(res) {
		var result = JSON.parse(res);
		if (result.data=="error"){
							var data_r = {
								//					
					  	}
										}}})
}
	//get energo4

	function get_req_energo4(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var data = {
				data: [
							["date","=",startDate-1],
							["date","=", endDate],						
					  ]	}	
	var requery=JSON.stringify(data);
	var sub_req = $.ajax({
		url: 'api/sobes',
		type: 'post',
		data:'data='+ requery,
		success: function(res) {
		var result = JSON.parse(res);
		if (result.data=="error"){
							var data_r = {
										//
											}
										}}})
}
// get energo5
	
	function get_req_energo5(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var data = {
				data: [
							["date","=",startDate-1],
							["date","=", endDate],					
					  ]	}
	var requery=JSON.stringify(data);
	var sub_req = $.ajax({
		url: 'api/sobes',
		type: 'post',
		data:'data='+ requery,
		success: function(res) {
		var result = JSON.parse(res);
		if (result.data=="error"){
							var data_r = {
									//
				}
			}
	}})
}
