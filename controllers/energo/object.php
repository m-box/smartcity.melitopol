<?php
include ("lib/templater.php");

	$obj_id=$route['arg'][0];
	$obj=db_read_if("object","id",$obj_id);

	if ($film!=="error")
		{
		$run=template_data("tpl/energo/energo-face.html","object",$obj[0]);
			if ($user_type=="1")
				{
				$run=str_replace("{!administr!}",'<a class="btn btn-warning pull-right" href="/g2g/energo-efficiency/edit/'.$obj_id.'">Редагувати заклад</a><br>',$run);	
				}
			else
				{
				$run=str_replace("{!administr!}",' ',$run);	
				}
		print_r($run);
		}
	else 
		{	
		$run=file_get_contents("tpl/404.html");
		print_r($run);
		}

?>