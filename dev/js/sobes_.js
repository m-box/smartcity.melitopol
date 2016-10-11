function sub_info(){
$('#captcha_err').text('');
var captcha = grecaptcha.getResponse();
 
// 2. Если ответ пустой, то выводим сообщение о том, что пользователь не прошёл тест.
// Такую форму не будем отправлять на сервер.
if (!captcha.length) {
  // Выводим сообщение об ошибке
  $('#captcha_err').text('Спочатку треба підтвердити що Ви не бот!');
} 
else
{	
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
 	if (os_rah ==""){  
	$('#sub_info').html('<label for=psw id="not_ok"><span class="glyphicon glyphicon-remove" style=color:red></span>Введіть дані</label>')	
																	
	}
	else{
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
											$('#sub_info').html('Шановний(-а) ' +user.NAME+ ' ' +user.Fname+ ' ' +user.Mname+ '<br>Управління соціального захисту Мелітопольської міської ради інформує про призначення Вам грошової допомоги на оплату житлово-комунальних послуг у вигляді субсидії в розмірі ' +user.SUM_SYBS+ ' ​​грн. в місяць. Саме на цю суму Вам буде надана знижка в квитанціях на житлово-комунальні послуги.<br>Субсидія призначена на період з ' +user.DATA_POCH+ ' по ' +user.DATA_KIN+ '.<br>')
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
												  var table = $('<table/>',{class:"table table-boarded", style:"font-size:10px"})
												  $(table, 'thead').append('<tr style="fontsize:small"><th>Організація</th><th>Особ.рахунок</th><th colspan=2>Соц. норма</th><th>Вартість послуг <br>згідно соціальної норми</th><th>Обов’язкова частка</th><th>Сума субсидії</th></tr>');												 
												$.each(query.data,function(){
												  var sum_subs = (parseInt(this.subs) - parseInt(this.plata))
												$(table, 'tbody').append('<tr style="fontsize:small"><td>' +this.NAZVA_ORG+ '<br>' +this.posluga+'</td><td>' +this.shet+ '</td><td>' +this.odinica+ '</td><td>' +this.norm_vart+ '</td><td>' +this.subs+ ' грн</td><td>' +this.plata+ ' грн</td><td>'+sum_subs+' грн</td></tr>')
												})
												}
												$('#sub_info').append(table)
												$('#sub_info').append('У випадку виникнення заборгованості за спожиті житлово-комунальні послуги (за інформацією житлово-комунальних підприємств) надання субсидії може бути припинено.<br>У разі зміни у складі зареєстрованих, їх соціального статусу, купівлі товарів або оплати послуг на суму понад 50 тис. грн., Ви зобов’язані повідомити управління соціального захисту.<br>У разі виникнення запитань щодо призначення субсидії рекомендуємо звернутися до найближчого відділу прийому громадян:<br>№1 – просп. Б. Хмельницького, 87, тел. 42-83-27;<br>№2 – вул. Леніна, 137, тел. 42-40-60;<br>№3 – просп. 50-річчя Перемоги, 36/1, тел. 5-37-78;<br>№4 – вул. Гагаріна, 1, тел. 7-22-22.<br>Детальнішу інформацію про субсидії Ви можете знайти на сайті: www.subsidii.mlt.gov.ua<br>Залишились питання? Телефонуйте на «гарячу» телефонну лінію: 0619 42-83-28<br>')
												}
											})
									}
							}})
						}
						else
						{var user = result.data[0];
										$('#Modalsobes').modal('show');
											$('#sub_info').html('Шановний(-а) ' +user.NAME+ ' ' +user.Fname+ ' ' +user.Mname+ '<br>Управління соціального захисту Мелітопольської міської ради інформує про призначення Вам грошової допомоги на оплату житлово-комунальних послуг у вигляді субсидії в розмірі ' +user.SUM_SYBS+ ' ​​грн. в місяць. Саме на цю суму Вам буде надана знижка в квитанціях на житлово-комунальні послуги.<br>Субсидія призначена на період з ' +user.DATA_POCH+ ' по ' +user.DATA_KIN+ '.<br>')
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
												  var table = $('<table/>',{class:"table table-boarded", style:"font-size:10px"})
												  $(table, 'thead').append('<tr style="fontsize:small"><th>Організація</th><th>Особ.рахунок</th><th colspan=2>Соц. норма</th><th>Вартість послуг <br>згідно соціальної норми</th><th>Обов’язкова частка</th><th>Сума субсидії</th></tr>');												 
												$.each(query.data,function(){
												  var sum_subs = (parseInt(this.subs) - parseInt(this.plata))
												$(table, 'tbody').append('<tr style="fontsize:small"><td>' +this.NAZVA_ORG+ '<br>' +this.posluga+'</td><td>' +this.shet+ '</td><td>' +this.odinica+ '</td><td>' +this.norm_vart+ '</td><td>' +this.subs+ ' грн</td><td>' +this.plata+ ' грн</td><td>'+sum_subs+' грн</td></tr>')
												})
												}
												$('#sub_info').append(table)
												$('#sub_info').append('У випадку виникнення заборгованості за спожиті житлово-комунальні послуги (за інформацією житлово-комунальних підприємств) надання субсидії може бути припинено.<br>У разі зміни у складі зареєстрованих, їх соціального статусу, купівлі товарів або оплати послуг на суму понад 50 тис. грн., Ви зобов’язані повідомити управління соціального захисту.<br>У разі виникнення запитань щодо призначення субсидії рекомендуємо звернутися до найближчого відділу прийому громадян:<br>№1 – просп. Б. Хмельницького, 87, тел. 42-83-27;<br>№2 – вул. Леніна, 137, тел. 42-40-60;<br>№3 – просп. 50-річчя Перемоги, 36/1, тел. 5-37-78;<br>№4 – вул. Гагаріна, 1, тел. 7-22-22.<br>Детальнішу інформацію про субсидії Ви можете знайти на сайті: www.subsidii.mlt.gov.ua<br>Залишились питання? Телефонуйте на «гарячу» телефонну лінію: 0619 42-83-28<br>')
												}
											})
						}
						
						
						}})
}}}
	
	
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
	 $("#result").html('Введені некоректні дані')
 }
 else if (suma_sub_bez_urah_area<=0){
	  suma_sub_bez_urah_area = suma_sub_bez_urah_area.toFixed(2);
	 $("#result").html('Ви не можете претендувати на субсидію')
 }
else {
	 suma_sub_bez_urah_area = suma_sub_bez_urah_area.toFixed(2);
 $("#result").html('Сума субсидії ' +suma_sub_bez_urah_area+ ' грн. на місяць')}
};
