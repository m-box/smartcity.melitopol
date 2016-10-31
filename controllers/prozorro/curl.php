<?php
ini_set('max_execution_time', 9000);
$url = 'http://api.openprocurement.org/api/2.3/tenders?opt_query=Мелитополь&limit=100&offset=';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
$result = curl_exec($ch);
curl_close($ch);

$res=json_decode($result, true);

/*  */

for ($i=0;$i<count($res['data']);$i++)
	{if ($res['data'][$i]['id']!=='')
		{
		$url = 'http://api.openprocurement.org/api/2.3/tenders/'.$res['data'][$i]['id'];
		print_r('<br>'.$url.'<br>');
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
		$results = curl_exec($ch);
		curl_close($ch);
		$rest=json_decode($results, true);
		print_r($i.'=>'.$results.'<br>');
		}
	}
	
?>