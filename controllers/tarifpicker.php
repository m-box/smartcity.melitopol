<?php
include ("../config.php");
$query=json_decode($_POST[tarif], true);

if (isset($query['param']) && $query['param']!="" && isset($query['id']) && $query['id']!="")
{
	$connect=mysql_connect($_CONFIG['db_host'], $_CONFIG['db_user'], $_CONFIG['db_pass']);
	if (!$connect) {return "DB_connect_server_error";}
	if(!mysql_select_db($_CONFIG['db_name'])) {return "DB_connect_error";}	
	$querydb=mysql_query("SELECT * 
FROM  `tarif` 
WHERE  `id_object` =".$query['id']."
AND  `param` LIKE  '".$query['param']."'
ORDER BY  `date` DESC 
LIMIT 0 , 1");
if (!$querydb or !mysql_num_rows($querydb))  {$data="error";}
else {	
	$row = mysql_fetch_assoc($querydb); 
	foreach($row as $key => $value) 
		{ 
		$data[$key]=$value;	 
		}
	}
	echo(json_encode($data));
}
?>