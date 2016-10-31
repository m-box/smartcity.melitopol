
//
function charts(){
var value=$('input[name="optradio1"]:checked').val();

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
    value='heat';
    break
}
/*if (value=="Кількість кВт"){value='electro'}
else if (value=="Кількість газу"){value="gas"}
else if (value=="Кількість води"){value="water"}
else if (value=="Кількість тепла"){value="heat"};*/
var out = [];
var ch=0;
var outs=[
[cols=[
    {"id":"","label":"Дата","pattern":"","type":"string"},
    {"id":"","label":"Кількість","pattern":"","type":"number"}
],
rows=[]
]];
for(var i=0; i<object.length;i++){
if (i!=0){
var colvo=object[i][value]-object[i--][value];
outs['rows'][ch]={"c":[{"v":object[i][date],"f":null},{"v":colvo,"f":null}]}
}}
var jsonData=JSON.stringify(outs);
var data = new google.visualization.DataTable(jsonData);

        var options = {
          title: 'Данні',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);

}