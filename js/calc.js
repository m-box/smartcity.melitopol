function electro(){
	
	
	var tarif_electro_first = 0.714;
	var tarif_electro_second =  1.29;
	var tarif_electro_third = 1.638;
	var water = $("#water").val();
	var electro = $("#electro").val();

	if (electro <= 150) {
		result_electro_n = parseInt(electro) * tarif_electro_first
	}
	else if (150 >= electro < 600){
		
		result_electro_n = parseInt(electro) * tarif_electro_second
	}
	else if (electro >= 600){
		result_electro_n = parseInt(electro) * tarif_electro_third
	}
	if ($('input[name=type]:checked').val() == "lgot"){
		result_electro_lgot = parseInt(electro) *  tarif_electro_first
	}
	if ($('input[name=type]:checked').val() == "business"){
		result_electro_b = parseInt(electro) * tarif_electro_second		
	}
	if ($('input[name=type]:checked').val() == "norm"){
		$("#result_electro").html('Орієнтовна вартість' + result_electro_n.toFixed(2))
	}
	else if ($('input[name=type]:checked').val() == "lgot"){
		$("#result_electro").html('Орієнтовна вартість' + result_electro_lgot.toFixed(2))
	}
	else if ($('input[name=type]:checked').val() == "business"){
		$("#result_electro").html('Орієнтовна вартість' + result_electro_b.toFixed(2))
		
	}

}
function water(){
	var tarif_water = 16.38;
	var water = $("#water").val();
	result_water = parseInt(water) * tarif_water
	 $("#result_water").html('Орієнтовна вартість <br>' + result_water.toFixed(2))
}
function gaz(){
	var tarif_gaz = 6.879;
	var gaz = $("#gaz").val()
	result_gaz = parseInt(gaz) * tarif_gaz
	 $("#result_gaz").html('Орієнтовна вартість <br>' + result_gaz.toFixed(2))
}