function calend() {

	var now = new Date();
	var day = now.getDate()
	var month = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень","Вересень","Жовтень","Листопад", "Грудень"][ now.getMonth()]

	var weekday0 = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][ now.getDay()]
	var weekday1 = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][ now.getDay()+1]
	var weekday2 = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][ now.getDay()+2]
	var weekday3 = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][ now.getDay()+3]
	var weekday4 = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][ now.getDay()+4]
	var weekday5 = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][ now.getDay()+5]
	var weekday6 = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][ now.getDay()+6]

	var date0 = now.getDate()
	var date1 = now.getDate()+1
	var date2 = now.getDate()+2
	var date3 = now.getDate()+3
	var date4 = now.getDate()+4
	var date5 = now.getDate()+5
	var date6 = now.getDate()+6

	var datetd = String(now.getDate()) +' '+ (now.getMonth()+1) +' '+ now.getFullYear()
	var date_1 = String((now.getDate()+1)) +' '+ (now.getMonth()+1) +' '+ now.getFullYear()
	var date_2 = String((now.getDate()+2)) +' '+ (now.getMonth()+1) +' '+ now.getFullYear()
	var date_3 = String((now.getDate()+3)) +' '+ (now.getMonth()+1) +' '+ now.getFullYear()
	var date_4 = String((now.getDate()+4)) +' '+ (now.getMonth()+1) +' '+ now.getFullYear()
	var date_5 = String((now.getDate()+5)) +' '+ (now.getMonth()+1) +' '+ now.getFullYear()
	var date_6 = String((now.getDate()+6)) +' '+ (now.getMonth()+1) +' '+ now.getFullYear()

	$('#table').html('<table class="table table-responsive table-striped table-bordered" width="100%" ><thead><tr class="info"> <th>Лікар</th><th>Кабінет</th><th>'+ weekday0+' '+ date0+' '+month +'</th><th>'+ weekday1+' '+ date1+' '+month +'</th><th>'+ weekday2+' '+ date2+' '+month +'</th><th>'+ weekday3+' '+ date3+' '+month +'</th><th>'+ weekday4+' '+ date4+' '+month +'</th><th>'+ weekday5+' '+ date5+' '+month +'</th><th>'+ weekday6+' '+ date6+' '+month +'</th></tr></thead></table>')

	$.getJSON("doctors.json", function(data) {
	for (i=0; i<20; i++){
		lic_name = data[i].doctor
		cab_no = data[i].cab
		prof = data[i].prof
		if (date3 !== data[i].priem[date_3]||date4 !== data[i].priem[date_4]||date5 !== data[i].priem[date_5]||date6 !== data[i].priem[date_6]) {

		priemtd = data[i].priem[datetd].talons
		priem_1 = data[i].priem[date_1].talons
		priem_2 = data[i].priem[date_2].talons
		priem_3 = data[i].priem[date_3].talons
		priem_4 = data[i].priem[date_4].talons
		priem_5 = data[i].priem[date_5].talons
		priem_6 = data[i].priem[date_6].talons

		priemtd = parseInt(priemtd)
		priem_1 = parseInt(priem_1)
		priem_2 = parseInt(priem_2)
		priem_3 = parseInt(priem_3)
		priem_4 = parseInt(priem_4)
		priem_5 = parseInt(priem_5)
		priem_6 = parseInt(priem_6)
		timefree = []
		for (j=0; j < 6; j++) {
			freetime = data[i].priem[datetd][j].status
			
			timefree[j] = data[i].priem[datetd][j].time	
		
}

		if(priemtd<6){ ch_td = 6-priemtd;  talonstd =  'Вільно '+priemtd +' талонів '; colortd = "green"} else{colortd="red"; talonstd="Вільних талонів немає"}
		if (priem_1<6){ ch_1 = 6-priem_1;  talons_1 =  'Вільно '+ priem_1 +' талонів '; color_1 = "green"} else{color_1="red"; talons_1="Вільних талонів немає"}
		if (priem_2<6){ ch_2 = 6-priem_2;  talons_2 =  'Вільно '+ priem_2 +' талонів '; color_2 = "green"} else{color_2="red"; talons_2="Вільних талонів немає"}
		if (priem_3<6){ ch_3 = 6-priem_3;  talons_3 =  'Вільно '+ priem_3 +' талонів '; color_3 = "green"} else{color_3="red"; talons_3="Вільних талонів немає"}
		if (priem_4<6){ ch_4 = 6-priem_4;  talons_4 =  'Вільно '+ priem_4 +' талонів '; color_4 = "green"} else{color_4="red"; talons_4="Вільних талонів немає"}
		if (priem_5<6){ ch_5 = 6-priem_5;  talons_5 =  'Вільно '+ priem_5 +' талонів '; color_5 = "green"} else{color_5="red"; talons_5="Вільних талонів немає"}
		if (priem_6<6){ ch_6 = 6-priem_6;  talons_6 =  'Вільно '+ priem_6 +' талонів '; color_6 = "green"} else{color_6="red"; talons_6="Вільних талонів немає"}
		anotherval = []
		for (k=ch_td; k<6;k++) {
			anotherval[k] = '<option>'+timefree[k]+'</option>'
		}
		$('#table').append('<tr><td>'+lic_name+'</td><td>'+cab_no+'</td><td style="background:'+colortd+';">'+talonstd+'</td><td style="background:'+color_1+';">'+talons_1+'</td><td style="background:'+color_2+';">'+talons_2+'</td><td style="background:'+color_3+';">'+talons_3+'</td><td style="background:'+color_4+';">'+talons_4+'</td><td style="background:'+color_5+';">'+talons_5+'</td><td style="background:'+color_6+';">'+talons_6+'</td></tr>')
		$('#inmodal').append('<tr style="text-align: center; height: 50px; background-color: #E5E5E5"><td><label><input type="radio" name="optradio">'+lic_name+'</label></td><td>'+prof+'</td><td>  <select class="form-control" id="sel1">'+anotherval+'</select></td></tr>')    
	}
	else{
		$('#table').append('<tr><td>lo'+lic_name+'</td><td>'+cab_no+'</td><td>Помилка дати</td><td>Помилка дати</td><td>Помилка дати</td><td>Помилка дати</td><td>Помилка дати</td><td>Помилака дати</td><td>Помилка дати</td></tr>')
	}}

});
	}


function patient (){
	var name_pat = $("#name_pat").val();
	var surname_pat = $("#surname_pat").val();
	var fathername_pat = $("#fathername_pat").val();
	var number_pat = $("#number_pat").val();
	var email_pat = $("#email_pat").val();
	var data = {};
	data.name = name_pat;
	data.surname = surname_pat;
	data.fathername = fathername_pat

	patients.data=data;
	var requery=JSON.stringify(patients);
	var kilk_vidviduv = $.ajax({
			url: "patients.php",
			type:'post',
			success: function(html){  
				$("#content").html(html);  
				},
			data:'data='+ requery

})}