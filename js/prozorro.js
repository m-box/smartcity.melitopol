var user = result.data[0];
	var data_pr={
			"method":"get",
			"data":[["status","=","1"]]
		}
		var restp=JSON.stringify(data_pr)
		$.ajax({
			url: 'api/prozorro',
			type: 'post',
			data:'data='+ restp,
			success: function(res) {
			var query=JSON.parse(res);
			if (query.data!="error")
			{
			var table = $('<table/>',{class:"table table-boarded", style:"font-size:10px"})
			  $(table, 'thead').append('<tr><th>Сумма (грн.)</th><th>Закупівельна організація</th><th>Предмет торгів</th><th>Дата</th><th>Статус</th></tr>');												 
				$.each(query.data,function(){
			$(table, 'tbody').append('<tr><th>' + this.value.amount +' </th><th>'+  this.organization.name +'</th><th>'+ this.tenders.items +'</th><th>'+this.tenders.date +'</th><th>'+this.tenders.status+'</th></tr>')
			})
			}
			$('#sub_info').append(table)
			}
		})
