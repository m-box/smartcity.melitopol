function sub_info(){
 var os_rah = $("#os_rah").val();
 var surname_ukr = $("#surname_ukr").val();
 var surname_rus = $("#surname_rus").val();
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1;
	var curr_year = d.getFullYear();
 var data = {
				method: "get_if",
				data: [
							["OS_RAH_ORG1","=",os_rah],
							["NAME","=", surname_ukr]							
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
											method: "get_if",
											data: [
													["OS_RAH_ORG1","=",os_rah],
													["NAME","=", surname_rus]
							
													]
										}
							var requery_r=JSON.stringify(data_r);
							$.ajax({
									url: 'api/sobes',
									type: 'post',
									data:'data='+ requery_r,
									success: function(res) {
									var result = JSON.parse(res);
									if (result.data=="error"){										
										$('#Modalsobes').modal('show');
										$('#sub_info').html('<label for=psw id="not_ok"><span class="glyphicon glyphicon-remove" style=color:red></span> Вибачте, на цей момент вказані Вами дані відсутні в системі нарахування субсидій, або помилкові. Повторіть свій запит після оновлення бази або виправте помилки.</label>')	
									}
									else
									{var user = result.data[0];
										$('#Modalsobes').modal('show');
											$('#sub_info').html('Шановний(-а)' + user.NAME+ ' ' + user.Fname+' '+ user.Mname'+<br> Управління соціального захисту Мелітопольської міської ради інформує про призначення Вам грошової допомоги на оплату житлово-комунальних послуг у вигляді субсидії в розмірі'+ user.SUM_SYBS ​+' ​грн. в місяць. Саме на цю суму Вам буде надана знижка в квитанціях на житлово-комунальні послуги.<br> Субсидія призначена на період з ' +user.DATA_POCH+ ' по ' +user.DATA_KIN+'.<br>.</label>')
										
											var rest={
												"method":"get_if",
												"data":[["N_SPRAVY","=",user.N_SPRAVY]]
												
											}
											var restp=JSON.stringify(rest)
											$.ajax({
												url: 'api/sobesdata',
												type: 'post',
												data:'data='+ restp,
												success: function(res) {
												var query=JSON.parse(res);
												if (query.data!="error")
												{
												$('#sub_info').append('<table class="table table-boarded"> <tr><th>Організація</th><th>Особ.рахунок</th><th colspan=2>Соціальна норма</th><th>Вартість послуг згідно соціальної норми</th><th>Обов’язкова частка</th><th>Сума субсидії</th></tr>')	
												$.each(query.data,function(){
												$('#sub_info').append('<tr><td>'+this.NAZVA_ORG+'<br>'+this.shet+'</td><td>'+this.odnica+'</td><td>'+this.norm_vart+'</td><td>'+this.subs+' грн. </td><td>'+this.plata+' грн. </td><td>'+ suma_sub=this.subs-this.plata+' грн.</td></tr>')	
												})
												$('#sub_info').append('</table>');
												}
																			
												
												}
											})
									  
									}
							}})
							
							
							
												
						}
						else
						{var user = result.data[0];
										$('#Modalsobes').modal('show');
											$('#sub_info').html('<label for=psw><span class="glyphicon glyphicon-ok" style=color:green></span> '+user.NAME+' '+user.Fname+ ' '+user.Mname+' '+', Вам нарахована субсидія! Сума субсидії складає '+user.SUM_SYBS+' грн. Субсидія діє від: '+user.DATA_POCH+' до: '+user.DATA_KIN+'.</label>')
											$('#sub_info').append('1. <b>'+user.NAME+' '+user.Fname+ ' '+user.Mname+'</b><br>')
											$('#sub_info').append('2. <b>72'+user.KVUL+', місто Мелітополь, '+user.TYP+' '+user.NVUL+' '+user.BUD+' '+user.KORP+' '+user.KVAR+'.</b><br>')
											$('#sub_info').append('Встановлено відсоток обов’язкової частки сплати @COL 14, призначено субсидію для відшкодування витрат на оплату житлово-комунальних послуг на опалювальний період, <b>з ' +user.DATA_POCH+ ' по '+user.DATA_KIN+' включно</b>, щомісячно. В сумі <b>'+user.SUM_SYBS+'.</b>По закінченню опалювального сезону субсидія буде перерахована.<br>')
											var rest={
												"method":"get_if",
												"data":[["N_SPRAVY","=",user.N_SPRAVY]]
												
											}
											var restp=JSON.stringify(rest)
											$.ajax({
												url: 'api/sobesdata',
												type: 'post',
												data:'data='+ restp,
												success: function(res) {
												var query=JSON.parse(res);
												if (query.data!="error")
												{
												$('#sub_info').append('<table width="100%" border=1 id=infotron><tr><th>Організація</th><th>Особ.рахунок</th><th style=text-align:right>Соціальна норма</th><th style=text-align:right>Обов.плата</th></tr>')	
												$.each(query.data,function(){
												$('#infotron').append('<tr><td>'+this.NAZVA_ORG+'<br>'+this.posluga+'</td><td>'+this.shet+'</td><td>'+this.odinica+' '+this.norm_vart+' '+this.subs+'</td><td>'+this.plata+'</td></tr>')	
												})
												
												}
											}})
						}
						
						
						}})
	}
	
	
//калькулятор

function calcsobes(){
 var kilk = $("#kilk_1").val();
 var dohid1 = $("#dohid1").val();
 var dohid2 = $("#dohid2").val();
 var dohid3 = $("#dohid3").val();
 var dohid4 = $("#dohid4").val();
 var dohid5 = $("#dohid5").val();
 var dohid6 = $("#dohid6").val();
 var dohid7 = $("#dohid7").val();
 var dohid8 = $("#dohid8").val();
 var dohid9 = $("#dohid9").val();
 var dohid10 = $("#dohid10").val();
 var dohid11 = $("#dohid11").val();
 var dohid12 = $("#dohid12").val();
 var area = $("#area").val();
 var paltazacomun = $("#paltazacomun").val();
 var subs_area = 48.87;
 var real_area
 var sumdoh;
 var ser_sumdoh;
 var ser_sumdoh_osob;
 var vids_obov_chastk_plat;
 var obsyag_mis_plat;
 var mazhor_area;
 var plat_z_urah_sub_area;
 var mazhor_plat;
 var suma_sub_bez_urah_area; 
 real_area = parseInt(area/kilk);
 sumdoh = (parseInt(dohid1)+parseInt(dohid2)+parseInt(dohid3)+parseInt(dohid4)+parseInt(dohid5)+parseInt(dohid6)+parseInt(dohid7)+parseInt(dohid8)+parseInt(dohid9)+parseInt(dohid10)+parseInt(dohid11)+parseInt(dohid12));
 ser_sumdoh = (sumdoh/12);
 ser_sumdoh_osob = (ser_sumdoh/parseInt(kilk));
 vids_obov_chastk_plat = (ser_sumdoh_osob/1176/2*15);
 obsyag_mis_plat = (ser_sumdoh/100*vids_obov_chastk_plat);
 if (real_area < subs_area){
 mazhor_area = (real_area - subs_area);
 mazhor_plat = (parseInt(paltazacomun)/real_area*mazhor_area);
 }
 else{
 mazhor_plata= 0
 mazhor_area = 0
 }
 plat_z_urah_sub_area=(parseInt(paltazacomun)-mazhor_plat);
 suma_sub_z_urah_area=(obsyag_mis_plat - plat_z_urah_sub_area);
 suma_sub_bez_urah_area=(parseInt(paltazacomun) - obsyag_mis_plat);

 if (isNaN(suma_sub_bez_urah_area)==true){
	 $("#result").html('<p class="label label-info" id="result">Виникла помилка при обчисленнях</p>' )
 }
 else if (suma_sub_bez_urah_area<=0){
	  suma_sub_bez_urah_area = suma_sub_bez_urah_area.toFixed(2);
	 $("#result").html('<p class="label label-info" id="result">Вам не належить отримання субсидії</p>')
 }
else {
	 suma_sub_bez_urah_area = suma_sub_bez_urah_area.toFixed(2);
 $("#result").html('<p class="label label-info" id="result">Сума субсидії ' +suma_sub_bez_urah_area+ 'грн. в місяць </p>')}
};
